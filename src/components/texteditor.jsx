import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { setDoc, doc, getDoc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase-config";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import { throttle } from "lodash";

export const TextEditor = ({ roomId, userId }) => {
  const quillRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const isLocalChange = useRef(false);
  const documentRef = doc(db, "documents", roomId);

  // Generate unique ID for new comments
  const generateId = () => Math.random().toString(36).substring(2, 9);

  const saveContent = throttle(() => {
    if (quillRef.current && isLocalChange.current) {
      const content = quillRef.current.getEditor().getContents();
      setDoc(documentRef, { 
        content: content.ops,
        participants: { [userId]: true }
      }, { merge: true })
        .catch(console.error);
      isLocalChange.current = false;
    }
  }, 1000);

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        text: newComment,
        userId,
        id: generateId(),
        timestamp: Date.now()
      };

      updateDoc(documentRef, {
        comments: [...comments, newCommentObj]
      }).catch(console.error);
      setNewComment("");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const commentToDelete = comments.find(c => c.id === commentId);
      if (commentToDelete) {
        await updateDoc(documentRef, {
          comments: arrayRemove(commentToDelete)
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    if (quillRef.current && roomId) {
      // Load initial content and comments
      getDoc(documentRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.content) {
              quillRef.current.getEditor().setContents(data.content);
            }
            if (data.comments) {
              setComments(data.comments);
            }
          }
        })
        .catch(console.error);

      // Listen for real-time updates
      const unsubscribe = onSnapshot(documentRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          
          if (data.content && !isEditing) {
            const editor = quillRef.current.getEditor();
            const currentCursorPosition = editor.getSelection()?.index || 0;
            editor.setContents(data.content, "silent");
            editor.setSelection(currentCursorPosition);
          }
          
          if (data.comments) {
            setComments(data.comments);
          }
        }
      });

      const editor = quillRef.current.getEditor();
      editor.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          isLocalChange.current = true;
          setIsEditing(true);
          saveContent();
          setTimeout(() => setIsEditing(false), 5000);
        }
      });

      return () => {
        unsubscribe();
        editor.off("text-change");
      };
    }
  }, [roomId]);

  return (
    <div className="text-editor-container">
      <div className="text-editor">
        <ReactQuill ref={quillRef} />
      </div>
      
      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="user-id">User {comment.userId.slice(0, 5)}</span>
                {comment.userId === userId && (
                  <button 
                    className="delete-comment"
                    onClick={() => deleteComment(comment.id)}
                    aria-label="Delete comment"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="comment-text">{comment.text}</div>
              {comment.timestamp && (
                <div className="comment-time">
                  {new Date(comment.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="comment-input">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            onKeyPress={(e) => e.key === 'Enter' && addComment()}
          />
          <button onClick={addComment}>Post</button>
        </div>
      </div>
    </div>
  );
};
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");

  // ✅ Handle Signup
  if (signupBtn) {
    signupBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      const msg = document.getElementById("signupMessage");

      msg.textContent = "⏳ Creating account...";
      msg.style.color = "orange";

      try {
        const auth = window.auth;
        const db = window.db;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          createdAt: new Date().toISOString(),
        });

        msg.textContent = "✅ Account created successfully!";
        msg.style.color = "green";

        setTimeout(() => {
          window.location.href = "{{ url_for('login') }}"; // Flask login route
        }, 1500);
      } catch (error) {
        console.error("Signup error:", error);
        msg.textContent = "❌ " + error.message;
        msg.style.color = "red";
      }
    });
  }

  // ✅ Handle Login (optional for login.html)
  if (loginBtn) {
    loginBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const msg = document.getElementById("loginMessage");

      msg.textContent = "⏳ Logging in...";
      msg.style.color = "orange";

      try {
        const auth = window.auth;
        await signInWithEmailAndPassword(auth, email, password);

        msg.textContent = "✅ Login successful!";
        msg.style.color = "green";

        setTimeout(() => {
          window.location.href = "/"; // dashboard or index
        }, 1500);
      } catch (error) {
        console.error("Login error:", error);
        msg.textContent = "❌ " + error.message;
        msg.style.color = "red";
      }
    });
  }
});

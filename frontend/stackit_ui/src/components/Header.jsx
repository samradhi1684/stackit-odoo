// src/components/Header.jsx
import { useState } from "react";
import { useRole } from "../context/RoleContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Header = () => {
  const { role, setRole, setUser, user } = useRole();
  const [show, setShow] = useState(false);
  const [tempRole, setTempRole] = useState("user");
  const [name, setName] = useState("");

  const handleLogin = () => {
    setRole(tempRole);
    setUser({ name });
    setShow(false);
  };

  const handleLogout = () => {
    setRole("guest");
    setUser(null);
  };

  return (
    <>
      <nav className="p-3 bg-dark text-white d-flex justify-content-between align-items-center">
        <h4>🧠 StackIt</h4>

        {role === "guest" ? (
          <button className="btn btn-light btn-sm" onClick={() => setShow(true)}>
            Login / Register
          </button>
        ) : (
          <div>
            <span className="me-3">Hi, {user?.name} ({role})</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login / Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder="Enter your name"
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select className="form-select" value={tempRole} onChange={(e) => setTempRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogin}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;

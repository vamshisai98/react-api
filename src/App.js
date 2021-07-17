import React, { useState, useEffect } from "react";
import api from "./api/contact";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const getContacts = async () => {
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addContact = async (contact) => {
    const request = {
      name,
      email,
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response, "res");
    setContacts([...contact, response.data]);
  };

  const deleteContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id + 1);
    setContacts(newContactList);
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await getContacts();
      if (allContacts) setContacts(allContacts);
    };
    console.log(contacts);
    getAllContacts();
  }, []);

  return (
    <div className='App'>
      <h1 style={{ textAlign: "center", background: "grey" }}>Basic CRUD</h1>
      <div className='container'>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <button onClick={() => addContact(contacts)}>Add</button>

        <div>
          {contacts.map((x, index) => (
            <div key={index}>
              <li>{x.name}</li>
              <div>{x.email}</div>
              <button>Edit</button>
              <button onClick={() => deleteContact(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate';
function register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState(''); // New state for confirm password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
          await registerUser(userName, password, password2); 
          router.push('/login'); 
        } catch (err) {
          setError(err.message || 'Failed to register. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  return (
    <div>
         <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Register</h2> {/* Change title */}
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error if there's any */}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="user">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" required value={userName} onChange={(e) => setUserName(e.target.value)} />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group id="password-confirm"> {/* New form group for confirm password */}
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">Register</Button> {/* Change button text */}
        </Form>
      </Card.Body>
    </Card>
    </div>
  )
}

export default register
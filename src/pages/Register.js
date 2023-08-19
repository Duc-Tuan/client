import { useContext } from "react";
import React from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = (props) => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    loading,
  } = useContext(AuthContext);
  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100%",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>

              <Form.Control
                type="text"
                placeholder="name"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    name: e?.target?.value,
                  })
                }
              />
              <Form.Control
                type="email"
                placeholder="email"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    email: e?.target?.value,
                  })
                }
              />
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e?.target?.value,
                  })
                }
              />

              <Button variant="primary" type="submit">
                {loading ? "Creating your account" : "Register"}
              </Button>
              {registerError?.error && (
                <Alert variant="danger">
                  <p>{registerError.mess}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;

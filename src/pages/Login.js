import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = (props) => {
  const { loginInfo, updateLoginInfo, registerError, loading, loginUser } =
    useContext(AuthContext);
  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100%",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>

              <Form.Control
                type="email"
                placeholder="email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e?.target?.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e?.target?.value })
                }
              />

              <Button variant="primary" type="submit">
                {loading ? "welcom..." : "Login"}
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

export default Login;

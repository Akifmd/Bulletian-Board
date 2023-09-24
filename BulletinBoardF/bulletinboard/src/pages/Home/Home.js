import { Col, Container, Row } from "reactstrap";
import NewFeed from "../Post/NewFeed";
import { CategoryDisplay } from "../../Category/CategoryDisplay";

const Home = () => {
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={2} className=" pt-3">
            <CategoryDisplay />
          </Col>
          <Col md={10}>
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

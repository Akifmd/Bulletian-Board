import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Container,
  FormGroup,
  Input,
  Label,
  Form,
} from "reactstrap";
import axios from "axios";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { getCurrentUserDetail, islogin } from "../../auth";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const PostDetials = () => {
  const { pId } = useParams();
  const { UserName } = useParams();
  const { Email } = useParams();
  //const { cId } = useParams();
  const [posts, setPost] = useState([]);
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState(0);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);
  const [likeStatus, setLikeStatus] = useState(true);
  const [isToggled, setIsToggled] = useState(false);

  const [data, setData] = useState({
    UserName: UserName,
    Email: Email,
    comments: "",
    pId: pId,
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const [comments, setComments] = useState([]);

  function likePost() {
    return (
      setIsToggled(!isToggled),
      axios
        .post(`https:/localhost:5036/Likes`, {
          UserName: UserName,
          pId: pId,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data == 1) {
            islogin()
              ? axios
                  .put(`https:/localhost:5036/Likes/${pId}`)
                  .then((response) => {
                    toast.success("You Liked the Post");
                    setLikes(response.data);
                  })
              : alert("Login to like the Post");
          } else {
            islogin()
              ? axios
                  .put(`https:/localhost:5036/DisLikes/${pId}`)
                  .then((response) => {
                    //console.log(response.data)
                    toast.error("You Disliked the Post");
                    setLikes(response.data);
                  })
              : alert("Login to Dislike the Post");
          }
        })
    );
  }

  function disLikePost() {
    return islogin()
      ? axios.put(`https:/localhost:5036/DisLikes/${pId}`).then((response) => {
          //console.log(response.data)
          toast.success("You Disliked the Post");
          setLikes(response.data);
        })
      : alert("Login to Dislike the Post");
  }
  useEffect(() => {
    setLogin(islogin());
    setUser(getCurrentUserDetail());
  }, []);

  useEffect(() => {
    //load post of postID
    axios
      .get("https:/localhost:5036/api/POST/SpecificPostDetials", {
        params: { PostId: pId },
      })
      .then((response) => {
        setPost(response.data);
      });
    //load comments
    axios
      .get("https:/localhost:5036/Comments/SpecificPostDetials", {
        params: { PostId: pId },
      })
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      });
    ////Likes Unique
    axios
      .get(`https://localhost:5036/isLikes?pId=${pId}&UserName=${UserName}`)
      .then((response) => {
        if (response.data == 1) setLikeStatus(response.data);
      });
  }, []);

  const handleChange = (e, props) => {
    setData({ ...data, [props]: e.target.value });
  };

  useEffect(() => {
    axios.put("https:/localhost:5036/views/" + pId).then((response) => {
      setViews(response.data);
    });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (data.comments.trim() == "") {
      alert("Fill all the Details");
      return;
    } else {
      islogin()
        ? axios
            .post(
              "https:/localhost:5036/api/Comments/InsertSingleComments",
              data
            )
            .then((response) => {
              console.log("adding to database", response);
              toast.success("Comments Added Successfully");

              setData({
                UserName: "",
                Email: "",
                comments: "",
              });
            })
        : alert("Login to Comment");

      // .catch((error) => {
      //   console.log("error log");
      //   alert("Error in Backend, failed!");
      //   setError({
      //     errors: error,
      //     isError: true,
      //   });
      // });
    }
  };

  return (
    <Container className="mt-4">
      {login && (
        <Link to={"/" + UserName + "/" + Email} className="btn border">
          Home
        </Link>
      )}
      {!login && (
        <Link to={"/"} className="btn border">
          Home
        </Link>
      )}
      <Row>
        <Col
          md={{
            size: 12,
          }}
        >
          <Card className="mt-4">
            <CardText className=" mt-2 ps-3">
              <b>
                <h2>{posts.post} </h2>
              </b>{" "}
              <br />
            </CardText>
            <CardText
              dangerouslySetInnerHTML={{ __html: posts.postDetials }}
              className="ps-3"
            ></CardText>

            <div
              className="divider"
              style={{ width: "100%", height: "1px", background: "Black" }}
            ></div>
            <CardText className="ps-3">
              <span className="text-muted">
                Category:<b>{posts.category}</b>
                <br />
                Posted on:<b>{posts.date_Time}</b>
                <br />
                Posted BY:<b>{posts.userName}</b>
                <br />
                Views:<b>{views}</b>
                <br />
                <br />
                <Button onClick={likePost} className="like-button-wrapper">
                  {" "}
                  {isToggled ? <AiFillDislike /> : <AiFillLike />}{" "}
                </Button>
                Likes:<b>{likes} likes</b>
              </span>
            </CardText>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={{ Size: 9, offset: 0 }}>
          <br />
          <h3>Comments ({comments.length})</h3>
          {comments.map((comment) => (
            <Card className="mt-2">
              <CardBody>
                <CardText>{comment.comments}</CardText>
                <CardText>Commented By: {comment.userName}</CardText>

                {islogin() && comment.userName == UserName ? (
                  <div>
                    <Link
                      className="btn btn-danger  "
                      to={
                        "/deleteComment/" +
                        comment.cId +
                        "/" +
                        UserName +
                        "/" +
                        Email +
                        "/" +
                        pId
                      }
                    >
                      Delete
                    </Link>
                    <Link
                      className="btn btn-secondary ms-3"
                      to={
                        "/updatecomment/" +
                        comment.cId +
                        "/" +
                        UserName +
                        "/" +
                        Email +
                        "/" +
                        pId
                      }
                    >
                      Update
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </CardBody>
            </Card>
          ))}
        </Col>
        <Col>
          <br />

          <h3>Enter Your Comments Down</h3>
          <Card className="mt-4 ps-4">
            <Form onSubmit={submitForm}>
              <CardBody>
                <FormGroup>
                  <Label for="comments">Enter Comments</Label>
                  <Input
                    type="text"
                    placeholder="Enter Comments"
                    id="comments"
                    onChange={(e) => handleChange(e, "comments")}
                    value={data.comments}
                  ></Input>
                </FormGroup>
                <center>
                  <Button className="mt-2" color="primary" type="submit">
                    Submit
                  </Button>
                </center>
              </CardBody>
            </Form>
          </Card>
        </Col>
      </Row>0
      
    </Container>
  );
};

export default PostDetials;

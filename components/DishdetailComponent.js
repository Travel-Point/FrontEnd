import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, Modal, Button, LogBox } from "react-native";
import { Card, Image, Icon, Rating, Input } from "react-native-elements";
import * as Animatable from 'react-native-animatable';

import { baseUrl } from "../shared/baseUrl";
// redux

import { connect } from "react-redux";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
    login: state.login
  };
};
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card>
          <Image
            source={{ uri: baseUrl + dish.image }}
            style={{
              width: "100%",
              height: 100,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon
              raised
              reverse
              type="font-awesome"
              color="#f50"
              name={this.props.favorite ? "heart" : "heart-o"}
              onPress={() => {
                this.props.login ? (
                  this.props.favorite ? alert("Already in your Card")
                    :
                    this.props.onPressFavorite()
                )
                  :
                  (
                    alert("Please login before using this service")
                  )
                }
              }
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="#3A2885"
              onPress={() => this.props.onPressComment()}
            />
          </View>
        </Card>
      );
    }
    return <View />;
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList
          data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          startingValue={item.rating}
          imageSize={16}
          readonly
          style={{ flexDirection: "row" }}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 3,
      author: "",
      comment: "",
    };
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }
  render() {
    const dishId = parseInt(this.props.route.params.dishId);

    return (
      // <RenderDish dish={this.state.dishes[dishId]} />
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderDish
            dish={this.props.dishes.dishes[dishId]}
            favorite={this.props.favorites.some((el) => el === dishId)}
            login = {this.props.login.isLoggedIn}
            onPressFavorite={() => this.markFavorite(dishId)}
            onPressComment={() => this.setState({ showModal: true })}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderComments
            comments={this.props.comments.comments.filter(
              (comment) => comment.dishId === dishId
            )}
          />
        </Animatable.View>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <View style={{ justifyContent: "center", margin: 20 }}>
            <Rating
              startingValue={this.state.rating}
              showRating={true}
              onFinishRating={(value) => this.setState({ rating: value })}
            />
            <View style={{ height: 20 }} />
            <Input
              //value={this.state.author}
              value={this.state.author}
              placeholder="Author"
              leftIcon={{ name: "user-o", type: "font-awesome" }}
              onChangeText={(text) => this.setState({ author: text })}
            />
            <Input
              value={this.state.comment}
              placeholder="Comment"
              leftIcon={{ name: "comment-o", type: "font-awesome" }}
              onChangeText={(text) => this.setState({ comment: text })}
            />

            <Button
              title="SUBMIT"
              color="#3A2885"
              onPress={() => {
                this.submitComment(dishId);
                this.setState({ showModal: false });
              }}
            />
            <Text></Text>

            <View style={{ width: 10 }} />
            <Button
              title="CANCEL"
              color="#898989"
              onPress={() => {
                this.setState({ showModal: false });
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
  markFavorite(dishId) {
    if (this.props.login.isLoggedIn) {
      alert("Added to your card ")
      this.props.postFavorite(dishId);
    }
    else {
      alert("Please login before using this service")
    }
  }

  submitComment(dishId) {
    // alert(
    //   dishId +
    //     ":" +
    //     this.state.rating +
    //     ":" +
    //     this.state.author +
    //     ":" +
    //     this.state.comment
    // );
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar, Card, Button, Text } from "react-native-elements";

import Loading from "./LoadingComponent";

import { baseUrl } from "../shared/baseUrl";
// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }

  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      // <ListItem
      //   key={index}
      //   onPress={() => navigate("Dishdetail", { dishId: item.id })}
      // >
      //   <Avatar source={{ uri: baseUrl + item.image }} size="large" />
      //   <ListItem.Content>
      //     <ListItem.Title style={{ color: "red" }}>
      //       {item.label}
      //     </ListItem.Title>
      //     <ListItem.Title style={{ fontWeight: "bold" }}>
      //       {item.name}
      //     </ListItem.Title>
      //     {/* <ListItem.Title>{item.category}</ListItem.Title> */}
      //     <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
      //   </ListItem.Content>
      // </ListItem>

      <Card key={index}>
        <Card.Title style={{}}>
          {item.name} - {item.price}
        </Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: baseUrl + item.image }}></Card.Image>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="View Detail"
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
        />
      </Card>
    );
  }
}

export default connect(mapStateToProps)(Menu);

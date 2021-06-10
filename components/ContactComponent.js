import React, { Component } from "react";
import { Text } from "react-native";
import { Card } from "react-native-elements";

class Contact extends Component {
  render() {
    return (
      <Card>
        <Card.Title>Contact Information</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 15, fontStyle: "italic" }}>
          🎉 121, Clear Water Bay Road
        </Text>
        <Text style={{ margin: 15, fontStyle: "italic" }}>
          🎉 Clear Water Bay, Kowloon
        </Text>
        <Text style={{ margin: 15, fontStyle: "italic" }}>🎉 HONG KONG</Text>
        <Text style={{ margin: 15, fontStyle: "italic" }}>
          🎉 Tel: +852 1234 5678
        </Text>
        <Text style={{ margin: 15, fontStyle: "italic" }}>
          🎉 Fax: +852 8765 4321
        </Text>
        <Text style={{ margin: 15, fontStyle: "italic" }}>
          🎉 Email:confusion@food.net
        </Text>
      </Card>
    );
  }
}
export default Contact;

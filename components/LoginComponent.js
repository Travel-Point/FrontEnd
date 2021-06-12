import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { login } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(login(email, password))
});
class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', margin: 20 }}>
                <Input
                    placeholder='Username'
                    leftIcon={{ name: 'user-o', type: 'font-awesome' }}
                    value={this.state.email}
                    onChangeText={(u) => this.setState({ email: u.toLowerCase() })} />
                <Input
                    placeholder='Password'
                    leftIcon={{ name: 'key', type: 'font-awesome' }}
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={(p) => this.setState({ password: p.toLowerCase() })} />
                <View style={{ marginTop: 20 }}>
                    <Button title='Login' color='#7cc' onPress={() => this.login(this.state.email, this.state.password)} />
                </View>
            </View>
        );
    }
    login(email, password) {
        this.props.login(email, password);
    }
};

export default connect(null, mapDispatchToProps)(Login);
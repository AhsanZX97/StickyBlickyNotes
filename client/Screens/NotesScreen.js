import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { postNote, editNote } from '../Actions';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

const colourScheme = [
    Purple = {
        name: "Purple",
        titleColor: "#e7cfff",
        borderColor: "#723226",
        noteColor: "#f2e6ff",
        placeholderTextColor: "#696969",
        color: 'black'
    },
    Red = {
        name: "Red",
        titleColor: "#FFCFCF",
        borderColor: "#722626",
        noteColor: "#FFE6E6",
        placeholderTextColor: "#696969",
        color: 'black'
    },
    Blue = {
        name: "Blue",
        titleColor: "#CDE9FF",
        borderColor: "#D2E0ED",
        noteColor: "#E2F1FF",
        placeholderTextColor: "#696969",
        color: 'black'
    },
    Green = {
        name: "Green",
        titleColor: "#CBF1C4",
        borderColor: "#D4E7D0",
        noteColor: "#E4F9E0",
        placeholderTextColor: "#696969",
        color: 'black'
    },
    Black = {
        name: "Black",
        titleColor: "#494745",
        borderColor: "#747474",
        noteColor: "#696969",
        placeholderTextColor: "#BFBFBF",
        color: 'white'
    },
]

class NotesScreen extends React.Component {

    state = {
        titleVal: "",
        note: "",
        key: undefined,
        Color: "Purple",
        titleColor: "#e7cfff",
        borderColor: "#723226",
        noteColor: "#f2e6ff",
        placeholderTextColor: "#696969",
        color: 'black'
    }

    createNote = () => {

        this.setState({
            titleVal: this.state.titleVal.trim()
        })

        if (this.state.titleVal === "") {
            alert("Title cannot be empty")
        }
        else {
            var colourScheme = {
                Color: this.state.Color,
                titleColor: this.state.titleColor,
                borderColor: this.state.borderColor,
                noteColor: this.state.noteColor,
                placeholderTextColor: this.state.placeholderTextColor,
                color: this.state.color
            }
            console.log(colourScheme);
            this.props.postNote(this.state.titleVal, this.state.note, colourScheme);
            this.setState({
                titleVal: "",
                note: "",
                Color: "Purple",
                titleColor: "#e7cfff",
                borderColor: "#723226",
                noteColor: "#f2e6ff",
                placeholderTextColor: "#696969",
                color: 'black'
            })
            this.props.navigation.replace('StickyBlicky Notes');
        }
    }

    editNote = () => {
        this.setState({
            titleVal: this.state.titleVal.trim()
        })

        if (this.state.titleVal === "") {
            alert("Title cannot be empty")
        }
        else {
            var colourScheme = {
                Color: this.state.Color,
                titleColor: this.state.titleColor,
                borderColor: this.state.borderColor,
                noteColor: this.state.noteColor,
                placeholderTextColor: this.state.placeholderTextColor,
                color: this.state.color
            }
            this.props.editNote(this.state.titleVal, this.state.note, colourScheme, this.state.key);
            this.setState({
                titleVal: "",
                note: "",
                key: undefined,
                Color: "Purple",
                titleColor: "#e7cfff",
                borderColor: "#723226",
                noteColor: "#f2e6ff",
                placeholderTextColor: "#696969",
                color: 'black'
            })
            this.props.navigation.replace('StickyBlicky Notes');
        }
    }

    selectColour = (colour) => {
        for (var i = 0; i < colourScheme.length; i++) {
            if (colourScheme[i].name === colour) {
                this.setState({
                    Color: colourScheme[i].name,
                    titleColor: colourScheme[i].titleColor,
                    borderColor: colourScheme[i].borderColor,
                    noteColor: colourScheme[i].noteColor,
                    placeholderTextColor: colourScheme[i].placeholderTextColor,
                    color: colourScheme[i].color
                })
            }
        }
    }

    componentWillMount() {
        if (this.props.route.params != undefined) {
            var note = this.props.route.params.note;
            this.setState({
                titleVal: note.title,
                note: note.noteText,
                key: note.key,
                Color: note.colorScheme.Color,
                titleColor: note.colorScheme.titleColor,
                borderColor: note.colorScheme.borderColor,
                noteColor: note.colorScheme.noteColor,
                placeholderTextColor: note.colorScheme.placeholderTextColor,
                color: note.colorScheme.color
            })
        }
    }

    render() {

        var button;
        if (this.state.key != undefined) {
            button = (
                <ActionButton.Item buttonColor='#9b59b6' title="Save Note" onPress={this.editNote}>
                    <Icon name="md-save" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            )
        }
        else {
            button = (
                <ActionButton.Item buttonColor='#9b59b6' title="Create Note" onPress={this.createNote}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            )
        }

        return (
            <MenuProvider >
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={{
                            height: 60,
                            backgroundColor: this.state.titleColor,
                            borderBottomColor: this.state.borderColor,
                            borderBottomWidth: 1,
                            color: this.state.color
                        }}
                        placeholder="ADD TITLE..."
                        placeholderTextColor={this.state.placeholderTextColor}
                        ref={(el) => { this.titleVal = el; }}
                        onChangeText={(titleVal) => this.setState({ titleVal })}
                        value={this.state.titleVal}
                    />
                    <TextInput underlineColorAndroid="transparent"
                        style={{
                            backgroundColor: this.state.noteColor,
                            color: this.state.color,
                            textAlignVertical: "top"
                        }}
                        placeholder="Add Notes..."
                        placeholderTextColor={this.state.placeholderTextColor}
                        ref={(el) => { this.note = el; }}
                        onChangeText={(note) => this.setState({ note })}
                        value={this.state.note}
                        multiline={true}
                        numberOfLines={42} />
                    <ActionButton buttonColor="#f4511e">
                        <ActionButton.Item buttonColor='#1abc9c' title="Change Colour" onPress={() => { }}>
                            <Menu renderer={SlideInMenu} onSelect={value => this.selectColour(value)}>
                                <MenuTrigger>
                                    <Icon name="md-brush" style={styles.actionButtonIcon} />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption value={'Purple'} text='Purple' />
                                    <MenuOption value={'Red'} text='Red' />
                                    <MenuOption value={'Blue'} text='Blue' />
                                    <MenuOption value={'Green'} text='Green' />
                                    <MenuOption value={'Black'} text='Black' />
                                </MenuOptions>
                            </Menu>
                        </ActionButton.Item>
                        {button}
                    </ActionButton>
                </View>
            </MenuProvider>
        )
    }
}

const styles = StyleSheet.create({
    createButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#f4511e',
        width: 70,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

})

export default connect(null, { postNote, editNote })(NotesScreen);
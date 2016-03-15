import React                      from "react";
import TextInput                  from "../commons/TextInput";
import CtrlSelect                 from "./ctrl/CtrlSelect";
import CtrlSaveDel                from "./ctrl/CtrlSaveDel";


class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
    };
  } 

  changeName(name, value) {
    this.state.courseName = value;
    this.setState({ courseName: this.state.courseName });
  }

  getCourseName(){
    return this.state.courseName;
  }

  render() {
    return (
        <TextInput
          name="courseName"
          label="Nom"
          ref="courseName"
          value={this.state.courseName}
          changeValue={ (name, value) => { this.changeName(name, value); } }
        />
    );
  }
}



export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
    };
  } 

  setCurrentCourse(course){
    this.setState({ course: course });
    console.log(course);
  }

  onSave(){
    console.log('onSave');
    //console.log('this.refs', this.refs.ctrlInput.refs.courseName.refs.courseName.value);
    let courseName = this.refs.ctrlInput.getCourseName();
    this.state.course.name = courseName;
    this.setState({course: this.state.course })
    this.props.save(this.state.course);
  }

  onDelete(){
    console.log('onDelete');
  }

  render() {
    return (
      <div className="container">
        <CtrlSelect
          list={this.props.courses}
          title="Noms de cours"
          currentSelection={ this.setCurrentCourse.bind(this) }
        />

        <CtrlInput ref="ctrlInput" />

        <CtrlSaveDel
          save={this.onSave.bind(this)}
          delete={this.onDelete.bind(this)}
        />
      </div>
    );
  }
}

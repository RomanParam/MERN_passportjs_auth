import React from "react";

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { click: false, times: 0 };
    this.onclickHandlerUsualFunct = this.onclickHandlerUsualFunct.bind(this); // при первом заходе в компонент срабатывает конструктор, в котором байндит контекст this класса к функции usualFunction
  }

  // state = {
  //   clicked: false,
  //   times: 0
  // };


  onclickHandler = () => {
    this.setState({ clicked: true });
    this.setState ((prevState)=>({times: ++prevState.times}))
  };

  onclickHandlerUsualFunct() {
    this.setState({ clicked: true });
    this.setState ((prevState)=>({times: ++prevState.times}))
  }

  componentDidMount() {
    console.log("CLASS_COMP MOUNTED");
  }

  componentDidUpdate() {
    console.log("CLASS_COMP UPDATED");
  }

  componentWillUnmount() {
    console.log("CLASS_COMP UNMOUNTED");
  }

  render() {
    // console.log(this.state)
    return (
      <div onClick={this.onclickHandler}>
        <span style={{ cursor: "pointer" }} className='component'>
          "Hello Class! Click ME!!!"
        </span>
        <div>пропсы класса: {this.props.hello}</div>
        {/* с пом. зарезервированного слова this.props мы можем поймать пропсы  */}
        <div>{this.state.clicked && ` you clicked ${this.state.times} times`}</div>
      </div>
    );
  }
}

export default ClassComponent;

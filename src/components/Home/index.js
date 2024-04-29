import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Home extends Component {
  state = {
    userInput: '',
    dropdownInput: 'HEALTH',
    tasksList: [],
    activeTag: 'INITIAL',
  }

  onClickAddButton = () => {
    const {userInput, dropdownInput} = this.state
    const newTask = {
      id: uuidv4(),
      task: userInput,
      tag: dropdownInput,
      bgColor: false,
    }

    if (newTask.task !== '') {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        userInput: '',
        dropdownInput: '',
      }))
    }
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangeDropdownInput = event => {
    this.setState({dropdownInput: event.target.value})
  }

  onClickTagButton = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {userInput, dropdownInput, tasksList, activeTag} = this.state
    const filteredList =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(eachTask => eachTask.tag === activeTag)

    return (
      <div className="main-container">
        <form className="left-container">
          <h1 className="left-heading">Create a task!</h1>
          <label className="label-text" htmlFor="userInput">
            Task
          </label>
          <input
            type="text"
            className="user-input"
            value={userInput}
            onChange={this.onChangeUserInput}
            placeholder="Enter the task here"
            id="userInput"
          />
          <label className="label-text" htmlFor="dropdown">
            Tags
          </label>
          <select
            className="user-input"
            id="dropdown"
            value={dropdownInput}
            onChange={this.onChangeDropdownInput}
          >
            {tagsList.map(eachTag => (
              <option
                className="option"
                key={eachTag.optionId}
                value={eachTag.optionId}
              >
                {eachTag.displayText}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-button"
            onClick={this.onClickAddButton}
          >
            Add Task
          </button>
        </form>
        <div className="right-container">
          <h1 className="right-heading">Tags</h1>
          <ul className="tags-container">
            {tagsList.map(eachTag => (
              <li key={eachTag.optionId}>
                <button
                  type="button"
                  className="tag-button"
                  value={eachTag.optionId}
                  onClick={this.onClickTagButton}
                >
                  {eachTag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="right-heading">Tasks</h1>
          <ul className="tasks-container">
            {filteredList.length === 0 ? (
              <div className="no-task-container">
                <p className="no-task-text">No Tasks Added Yet</p>
              </div>
            ) : (
              filteredList.map(eachTask => (
                <li className="task-item" key={eachTask.id}>
                  <p className="task">{eachTask.task}</p>
                  <p className="tag">{eachTask.tag}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home

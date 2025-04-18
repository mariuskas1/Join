import React from 'react';
import "../../index.css";
import { useNavigate, useLocation } from 'react-router-dom';

const HelpPage = () => {
    const navigate = useNavigate();

    const navigateToPreviousPage = () => {
        const previousPage = localStorage.getItem('previousPage');
        if (previousPage) navigate(previousPage);
    };

  return (
    <div className="info-main">
      <div className="info-header">
        <h1>Help</h1>
        <img 
          src="assets/img/arrow-left-line.png" 
          className="return-img" 
          alt="Return" 
          onClick={navigateToPreviousPage}
        />
      </div>

      <span>
        Welcome to the help page for <span className="blue">Join</span>, your guide to using our kanban project management tool. Here,
        we'll provide an overview of what <span className="blue">Join</span> is, how it can benefit you, and how to use it.
      </span>

      <h2>What is Join?</h2>
      <br />
      <span>
        <span className="blue">Join</span> is a kanban-based project management tool designed and built by a group of dedicated students
        as part of their web development bootcamp at the Developer Akademie. <br /><br />

        Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and 
        maximize efficiency (or flow). <span className="blue">Join</span> leverages the principles of kanban to help users manage their tasks and 
        projects in an intuitive, visual interface. <br /><br />

        It is important to note that <span className="blue">Join</span> is designed as an educational exercise and is not intended for extensive 
        business usage. While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, 
        accuracy, or other aspects of quality regarding <span className="blur">Join</span>.
      </span>

      <h2>How to use it</h2>
      <br />
      <span>Here is a step-by-step guide on how to use <span className="blue">Join</span>:</span>
      <br /><br />

      <table className="help-table">
        <tbody>
          <tr>
            <td><h2>1.</h2></td>
            <td>
              <h3>Exploring the Board</h3>
              <span>When you log in to <span className="blue">Join</span>, you'll find a default board. This board represents your project and contains four default 
                lists: "To Do", "In Progress", "Await feedback" and "Done". <br />
              </span>
            </td>
          </tr>
          <tr>
            <td><h2>2.</h2></td>
            <td>
              <h3>Creating Contacts</h3>
              <span>In <span className="blue">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on 
                "New Contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks 
                on the board.
                <br />
              </span>
            </td>
          </tr>
          <tr>
            <td><h2>3.</h2></td>
            <td>
              <h3>Adding Cards</h3>
              <span> Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under 
                the appropriate list to create a new card. Fill in the task details in the card, like task name, description, due date, assignees, etc.
                <br />
              </span>
            </td>
          </tr>
          <tr>
            <td><h2>4.</h2></td>
            <td>
              <h3>Moving Cards</h3>
              <span> As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another.
                <br />
              </span>
            </td>
          </tr>
          <tr>
            <td><h2>5.</h2></td>
            <td>
              <h3>Deleting Cards</h3>
              <span>Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from 
                the board. Please exercise caution when deleting cards, as this action is irreversible. 
                <br /> <br />
                Remember that using <span className="blue">Join</span> effectively requires consistent updates from you and your team to ensure the board reflects 
                the current state of your project. <br /> 
                <br />
                Have more questions about <span className="blue">Join</span>? Feel free to contact us at marius.kasparek@gmail.com. We're here to help you!
                <br />
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Enjoy using Join!</h2>
    </div>
  );
}

export default HelpPage;

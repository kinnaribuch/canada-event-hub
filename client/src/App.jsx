import './App.scss';
import logo from "../src/assets/images/Logo.svg";
import { useEffect, useState } from 'react';
import axios from 'axios'
import thumb from "../src/assets/images/thumbnail.jpg";

function App() {

  const [events, setEvents] = useState([]);

  async function getEvents(){
    try {
      const response = await axios.get('http://localhost:8000/events'); 
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  useEffect(() => {
    getEvents();
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();

    const newEvent = {
      title: event.target.title.value,
      description: event.target.description.value,
    };

    console.log(newEvent);

    try {
      const response = await axios.post("http://localhost:8000/events/", newEvent);
      console.log(response);
    } catch (error) {
      console.error('Error adding event:', error);
    }
    getEvents();
  }

  async function handleDelete(id){
    try {
      console.log("event id",id);
      await axios.delete(
        `http://localhost:8000/events/${id}`
      );
      getEvents();

    }catch(error){
      console.error('Error deleting comment:', error);
      alert("Error deleting comment!");
    }
  }

  return <>
    <section className='header'>
      <div className="header__content">
        <a href="/" className='header__logo-link'><img src={logo} alt="Logo" className="header__logo" />Canada Event Hub</a>
      </div>
    </section>
    <section className='hero'>
      <div className="hero__content">
        <h1 className='hero__title'>Don't miss out! <br></br> Explore the <span className="hero__highlight">vibrant events</span> happening in Canada.</h1>
      </div>
    </section>
    <section className='new-event'>
      <div className="new-event__content">
        <h2 className="new-event__title">Add New Event</h2>
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className='upload-form__content'>
            <div className='upload-form__thumbnail'>
              <p className="upload-form__thumbnail-title">VIDEO THUMBNAIL</p>
              <img src={thumb} alt='upload video thumbnail' className='upload-form__image' />
            </div>
            <div className="upload-form__form">
              <div className="upload-form__title-block">
                  <label className="upload-form__label" htmlFor="name">TITLE</label>
                  <input type="text" id="name" name="title" className="upload-form__title"/>
              </div>
              <div>
                  <label className="upload-form__label" htmlFor="comment">ADD A DESCRIPTION</label>
                  <textarea id="comment" name="description" className="upload-form__description" rows="3"></textarea>
              </div>
            </div>
          </div>
          <div className='upload-form__button-content'>
            <button type="submit" className="upload-form__publish">PUBLISH</button>
          </div>
        </form>
      </div>
    </section>
    <section className='events'>
      <div className="events__content">
        <h2 className="events__title">Popular Events in Canada</h2>
        <ul className="events__list">
          {events.map(event => (
            <li key={event.id} className="events__list-item">
              <div className='event__image-content'>
                <img src={`http://localhost:8000${event.image}`} alt={event.title} className="events__image" />
              </div>
              <div className="events__list-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {/* <p className="video-detail__timestamp">{event.timestamp}</p> */}
                <button className="events__delete" onClick={() => handleDelete(event.id)} >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <footer className="footer">
      <div className="footer__copyright">2024 Eventify. All rights reserved.</div>
    </footer>
  </>;
}

export default App;

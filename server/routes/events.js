import { timeStamp } from "console";
import express from "express";
const router = express.Router();
import fs from "fs";
import { v4 as uuid } from "uuid";

const getEvents = () => {
  const eventsBuffer = fs.readFileSync("./data/events.json");
  const events = JSON.parse(eventsBuffer);
  return events;
};

router.get("/", (req, res) => {
  console.log("Get route");
  const events = getEvents();
  res.send(events);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const event = getEvents().find((event) => event.id === id);

  if (!event) {
    res.status(404).send("Video with given id does not exist");
  }
  res.json(event);
});

router.post("/", (req, res) => {
  const eventObject = req.body;
  const newEvent = {
    id: uuid(),
    title: eventObject.title,
    description: eventObject.description,
    image: "/images/thumbnail.jpg",
    timeStamp: Date.now()
  };

  const events = getEvents();
  events.push(newEvent);

  fs.writeFileSync("./data/events.json", JSON.stringify(events));

  res.json(newEvent);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const eventToDelete = getEvents().find((event) => event.id === id);
  const updatedEvents = getEvents().filter((event) => event.id !== id);

  if (!eventToDelete) {
    res.status(404).send("Video with given id does not exist");
  }

  // const events = getEvents();
  // const updatedEvents = events.pop(event)

  fs.writeFileSync("./data/events.json", JSON.stringify(updatedEvents));

  res.json(eventToDelete);
});

export default router;

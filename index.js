const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-GHP-ET-WEB-FT-SF/events';

const state = {
  events: []
  // could add other pieces of state
}

const eventsList = document.querySelector('#events');

const addEventForm = document.querySelector('#addEvent');
addEventForm.addEventListener('submit', createEvent);

/** 
 * Sync state with the API and rerender
 */
async function render() {
  await getEvents()
  renderEvents()
}
render ();

/**
 * Update state wutg recipes from API
 */
async function getEvents() {
  try {
    // fetch event data
    const response = await fetch(API_URL)
    // parse response - translate JSON into a JS object
    const json = await response.json()
    // update `events` array
    state.events = json.data
    // console.log(state.events)
  } catch(error) {
    console.error(error)
  }
}

/**
 * Ask API to create a new recipe and rerender
 * @param {Event} event
 */
async function createEvent(event) {
  event.preventDefault()

  const name = addEventForm.eventName.value
  const description = addEventForm.description.value
  const date = "2023-08-20T23:40:08.000Z"
  const location = addEventForm.location.value

  try {
    // post event data
    console.log("i'm being reached");
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, description, date, location})
    })
    // parse response
    const json = await response.json()
    render()

  } catch(error) {
    console.error(error)
  }
}

async function updateEvent(id, name, description, eventDate, location) {
  event.preventDefault()
  // STRETCH GOAL - add the HTML to provide the user a form where they can edit an existing recipe AND send a PUT request to the API to make those updates
}

/**
 * Ask API to delete a recipe and rerender
 * @param {number} id id of recipe to delete
 */
async function deleteEvent(id) {
  try {
    // make a DELETE request
    const response = await fetch(`${API_URL}/${id}` , {
      method: "DELETE"
    })
    render()
  }
  catch(error) {
    console.error(error)
  }
}
function renderEvents() {
  if(state.events.length <1) {
    const newListItem = document.createElement("li")
    newListItem.textContent= "No events found"
    eventsList.append(newListItem)
  }
  else {
    eventsList.replaceChildren(
    // for.each element object
    state.events.forEach((eventObj) => {
      // create a <li>
      const newListItem = document.createElement("li")
      newListItem.classList.add("event")

      // with a heading, paragraph
      // const newHeading = document.createElement("h2")
      // newHeading.textContent = eventObj.eventName
      const newParagraph = document.createElement("p")
      newParagraph.textContent = eventObj.description
      const eventDate = document.createElement("li")
      eventDate.textContent = eventObj.eventDate
      const newLocation = document.createElement("li")
      newLocation = eventObj.location

      const deleteButton = document.createElement("button")
      deleteButton.textContent = "Delete"
      deleteButton.addEventListener("click", () => deleteButton(eventObj.id))

      newListItem.append(newParagraph, eventDate, newLocation, deleteButton)
      // append to 'eventsList'
      eventsList.append(newListItem)
    })
    )
  }
}
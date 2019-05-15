import AppCard from '/js/components/card/card.js';
import ToDoList from '/js/components/todolist/todolist.js';
import { openDB } from '/node_modules/idb/build/esm/index.js';
import checkConnectivity from '/js/connection.js';

(async function(document)
{
  try
  {
    getData();
    addTask();
  }
  catch (error)
  {
    console.log(error);
  }

  async function getData()
  {
    const data = await fetch('/data/tasks.json');
    const json = await data.json();

    const database = await openDB('app-store', 1,
    {
      upgrade(db)
      {
        db.createObjectStore('tasks');
      }
    });

    if (navigator.onLine)
    {
      await database.put('tasks', json, 'tasks');
    }

    const tasks = await database.get('tasks', 'tasks');
    window.nbTasks = tasks.tasks.length;

    // console.log(tasks);

    const toDoList = new ToDoList();
    toDoList.initComponent('My To-Do List', JSON.stringify(tasks.tasks));

    while (document.getElementById('content').firstChild)
    {
      document.getElementById('content').removeChild(document.getElementById('content').firstChild); 
    }

    document.querySelector('#content').appendChild(toDoList);
  }

  function addTask()
  {
    window.addEventListener('addEvent', async (event) =>
    {
      await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "id": (window.nbTasks + 1).toString(),
            "libelle": document.querySelector('todo-list').shadowRoot.querySelector('.todolist-input').value,
            "status": "todo"
          })
      });

      getData();
    });
  }

  const app = document.querySelector('#app');
  const skeleton = app.querySelector('.skeleton');
  const listPage = app.querySelector('[page=list]');
  skeleton.removeAttribute('active');
  listPage.setAttribute('active', '');

  checkConnectivity();
  document.addEventListener('connection-changed', ({ detail }) => {
    // console.log(detail);
  });

  // try {
  //   const data = await fetch('/data/spacex.json');
  //   const json = await data.json();
  
  //   const database = await openDB('app-store', 1, {
  //     upgrade(db) {
  //       db.createObjectStore('articles');
  //     }
  //   });
  
  //   if (navigator.onLine) {
  //     await database.put('articles', json, 'articles');
  //   }

  //   const acticles = await database.get('articles', 'articles');
  
  //   const cards = acticles.map(item => {
  //     const cardElement = new AppCard();
      
  //     cardElement.initCard(item.image,
  //       item.placeholder,
  //       item.content.title,
  //       item.content.description);
  //     listPage.appendChild(cardElement);
  
  //     if (!'IntersectionObserver' in window) {
  //       cardElement.swapImage();
  //     }

  //     return cardElement;
  //   });
  
  //   /**
  //    * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  //    */
  //   const options = {
  //     rootMarging : '0px 0px 0px 0px'
  //   };
  //   const callback = entries => {
  //     entries.forEach((entry) => {
  //       // If image element in view
  //       if (entry.isIntersecting) {
  //         // Actualy load image
  //         const card = entry.target
  //         card.swapImage();
  //       }
  //     });
  //   };
  
  //   const io = new IntersectionObserver(callback, options);
  //   // Observe cards as they enter the viewport
  //   cards.forEach(card => {
  //     io.observe(card);
  //   }); 
  // } catch(error) {
  //   console.error(error);
  // }
})(document);

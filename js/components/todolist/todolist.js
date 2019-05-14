import { LitElement, html, css } from 'lit-element';

export default class ToDoList extends LitElement
{
    constructor()
    {
        super();

        this.title              = '';
        this.tasksCollection    = "";
    }

    initComponent(title, tasksCollection)
    {
        this.title              = title;
        this.tasksCollection    = JSON.parse(tasksCollection);
    }

    render()
    {
        let items = "";

        for (let key in this.tasksCollection)
        {
            const item      = this.tasksCollection[key];

            items += `<div>
                        <input type="checkbox" ${(item.status == 'done') ? ' checked ' : ''}/>
                        ${(item.status == 'done') ? `<s>${item.libelle}</s>` : item.libelle }
                      </div>`;
        }

        return html `
            <style>
                .todolist-container
                {
                    background-color: white;
                    border-radius: 10px;
                    padding: 10px;
                    margin: auto;
                    max-width: 750px;
                    box-shadow: 0 0 7px 0px #e4e4e4;
                }
                .todolist-container > header
                {
                    text-align: center;
                    border-bottom: 2px solid #e4e4e4;
                    padding-bottom: 5px;
                }
                .todolist-container > main
                {
                    padding-top: 10px;
                }
                .todolist-container > main > div:first-child
                {
                    align-items: stretch;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    margin: 10px;
                    box-shadow: 0 0 7px 0px #e4e4e4;
                }
                .todolist-container > main > div:first-child > input
                {
                    padding: 5px;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    border: 1px solid #3a66ea;
                    flex: 1;
                    line-height: 25px;
                }
                .todolist-container > main > div:first-child > button
                {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border: 1px solid #3a66ea;
                    background-color: #3a66ea;
                    color: white;
                    font-size: 25px;
                    width: 40px;
                }
                .todolist-container > main > div:not(:first-child)
                {
                    padding: 10px;
                }
            </style>
            <div class="todolist-container">
                <header>${this.title}</header>
                <main>
                    <div>
                        <input type="text" />
                        <button>+</button>
                    </div>
                    ${document.createRange().createContextualFragment(items)}
                </main>
            </div>
        `;
    }
}

customElements.define('todo-list', ToDoList);
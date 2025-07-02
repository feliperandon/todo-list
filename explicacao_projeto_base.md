```tsx
import type { TodosType } from "./types/todosType";

import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState<TodosType[]>([]);
  const [title, setTitle] = useState("");

  const addTodo = (title: string) => {
    const newTodo: TodosType = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodo((prev) => [...prev, newTodo]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    addTodo(title);
    setTitle("");
  };

  const toggleCompleted = (id: string) => {
    const comTodos = todo.map((todos) => {
      if (todos.id === id) {
        return {
          ...todos,
          completed: !todos.completed,
        };
      }
      return todos;
    });
    console.log(comTodos);
    return setTodo(comTodos);
  };

  const deleteTodo = (id: string) => {
    setTodo(todo.filter((todos) => todos.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
          type="submit"
        >
          Add
        </button>
      </form>

      <ul className="mt-4">
        {todo.map((task) => (
          <li key={task.id} className="flex gap-2.5 items-center py-1">
            <input
              type="checkbox"
              onChange={() => toggleCompleted(task.id)}
              checked={task.completed}
            />
            <span
              className={task.completed ? "line-through text-gray-400" : ""}
            >
              {task.title}
            </span>
            <button
              type="button"
              onClick={() => deleteTodo(task.id)}
              className="cursor-pointer"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

```tsx
const [todo, setTodo] = useState<TodosType[]>([]);
const [title, setTitle] = useState("");
```

Aqui estou criando estados com useState, para gerenciar dados. Faço primeiro um state que vai receber um array do tipo TodosType.

```tsx
type TodosType = {
  id: string;
  title: string;
  completed: boolean;
};
```

Ou seja, tudo que vier dentro desse array precisa ter um id, title e completed, a menos que eu use um ? para deixar opcional.

Depois disso crio uma arrow function

```tsx
const addTodo = (title: string) => {
  const newTodo: TodosType = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };

  setTodo((prev) => [...prev, newTodo]);
};
```

Essa função vai ser responsável por adicionar itens a esse array, um objeto dentro do array.
Crio um objeto chamado newTodo do tipo TodosType, que vai receber um random uui - então cada objeto novo no array vai ter um id único; um title, que vem do outro state que eu criei e um boolean marcando se a tarefa foi completada ou não.

Depois da criação do objeto, eu seto esse novo objeto dentro do array, utilizando o setTodo(), passando uma função que chama um spread operator prev e um segundo argumento que é o objeto criado.

Após isso, crio um handleSubmit para tomar conta da ação do submit do form

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (title.trim() === "") return;
  addTodo(title);
  setTitle("");
};
```

dou um e.preventDefault() para evitar ter aquela ação padrão de enviar o form logo de cara e resetar a pagina
Se o titulo estiver vazio, ele apenas retorna
Se tiver, ele adicionar o title na função addTodo que criei anteriormente
Aí eu limpo o title do input.

Depois disso, crio a função responsável por marcar a tarefa como completa ou não

```tsx
const toggleCompleted = (id: string) => {
	const comTodos = todo.map((todos) => {
		if ([todos.id](http://todos.id/) === id) {
		return {
		...todos,
		completed: !todos.completed,
	};
}
return todos;
});
console.log(comTodos);
return setTodo(comTodos);
};
```

Eu recebo um id do tipo string e depois crio uma variável que vai receber o resultado do map
Se o id que a função receber for igual ao id que estava no map, ele vai retornar o spread operator com o array antigo e vai mudar o completed pra opção contraria, se for false ele vira true. (Me explicar o pq eu uso o spread operator ...todos aqui e não ...prev)
Se não entrar na condicional, ele retorna o array modificação
Depois ele seta o novo array no setTodos, substituindo tudo pelo novo arr modificado

Funçao de delete

```tsx

const deleteTodo = (id: string) => {
	setTodo(todo.filter((todos) => [todos.id](http://todos.id/) !== id));
};
```

Aqui crio a função que recebe um id e ai seto a todo com filter, se o id recebido na func for diferente do id do todos, ele vai filtrar esse objeto com o id igual (Me corrija e explique exatamente oq errei)

Corrigido
O filter cria um novo array mantendo apenas os itens cujo id é diferente do recebido.
Isso significa que a tarefa com o id passado será excluída da nova lista.

Depois disso tudo, entra a parte do JSX

Crio uma div pai que encapsula o titutlo da To-Do List, que tem o form e a iteração de uma lista

onSubmit no form eu utilizo o handleSubmit criado la em cima, feito pra lidar com o envio do form

Depois tenho um input do tipo texto, responsável por guardar o title, usando o onChange com setTitle

Depois crio uma lista não ordenada, que vai ter um map do todo, que é meu array
Dentro vai ter um input checkbox com o toggleCompleted no onChange, passando id, ou seja, se o id aqui for igual o id la no map do toggle, ele vai mudar de false pra true ou vice versa. Alem de ter o task.checked, que vai servir pra mostrar o resultado na tela

Nisso crio uma lista recebendo o [task.id](http://task.id/)

Depois faco o botão de delete, que vai pegar aquela função deleteTodo, que vai receber um id no onChange

## localStorage Functionality

A primeira coisa foi chamar um useEffect que só renderiza na primeira abertura de página.

```tsx
useEffect(() => {
  const saved = localStorage.getItem("todolist");
  if (saved) {
    setTodo(JSON.parse(saved));
  }
}, []);
```

O que acontece aqui, eu salvo o getItem do localStorage numa variavel. Após isso eu checo se essa váriavel existe, ou seja, se há uma chave dentro do localStorage chamada “todolist”, se sim, eu setto essa variavel “saved” no setTodo. Resumindo, se houver um objeto no localStorage chamado todolist, ele vai trazer os itens de dentro e salvar no meu useState setTodo, renderizando todos as tarefas que ali coloquei.

Depois, chamei outro useEffect, esse com a funcionalidade de salvar os itens no localStorage, utlizando o setItem(key, value)

```tsx
useEffect(() => {
  localStorage.setItem("todolist", JSON.stringify(todo));
}, [todo]);
```

Aqui, teoriacamente funcionaria, mas por que não funcionou?

Toda vez que eu renderizava, esse useEffect era chamado uma vez e acabava salvando um array vazio, que era o “todo”. O que eu precisava fazer era simplesmente pensar numa solução, “só salve no localStorage depois que o estado todo for inicializado com dados reais”

A soluçao foi utilizar uma flag usando useRef, que foi responsavel por sinalizar se havia dados ou nao nesse todo.

```tsx
const isFirstLoad = useRef(true);

useEffect(() => {
  if (isFirstLoad.current) {
    isFirstLoad.current = false;
    return;
  }

  localStorage.setItem("todolist", JSON.stringify(todo));
}, [todo]);
```

A flag começa true e depois da primeira renderizaçao, ele seria desativa a flag, aí a partir da 2nd vez, quando o usuario mudar por açoes proprias, ele salva.

useRef me permite usar o .current, nisso, depois da primeira render, ele desativa a flag e começa a renderizar no useEffect sem passar pelo if, sem precisar retornar.

O useRef é utilizado aqui para nao causar re-render, diferente do useState nesse caso, já que o useState serve mais para mudanças na tela, o useRef aqui só me deu uma referencia da logica, onde eu nao precisaria mudar nada na tela, mas sim apenas validar a logica.

Corrigido:

O useRef foi utilizado para evitar re-renders desnecessarios. Diferente do usaeState, que é voltad0 mais para mudanças de interface. O useRef me trouxe uma flag de controle lógico, usado apenas na primeira render.

useRef é como um post-it no monitor, ele nao interfere na tela, mas vc consegue guardar execuçoes do codigo.

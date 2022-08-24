import React, { useCallback, useReducer, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';


const App=()=>{


  const [todos,setTodos]=useState([
    {
      id:1,
      text:'리액트 기초 알아보기',
      checked:true,
    },
    {
      id:2,
      text:'컴포넌트 스타일링 해보기',
      checked:true,
    },
    {
      id:3,
      text:'일정 관리 앱 만들어 보기',
      checked:false,
    },
  ])

  const nextId=useRef(4)

  const onInsert=useCallback(
    text=>{
      const todo={
        id:nextId.current,
        text,
        checked:false
      }

     setTodos(todos.concat(todo)) 
     nextId.current+=1
    },[todos],
  )

  const onRemove=useCallback(
    id=>{
      setTodos(todos.filter(item=>{
        return item.id!==id
      }))
    },[todos]
  )

  const onToggle=useCallback(
    id=>{
      setTodos(
        todos.map(item=>{
          return item.id===id ? {...item,checked:!item.checked} : item
        }),
      )
    },[todos]
  )

  return(
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
			<TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/> 
    </TodoTemplate> 
  )
}

export default App
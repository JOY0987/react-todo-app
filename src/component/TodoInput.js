import React, { useState } from 'react'
import {MdAdd} from 'react-icons/md'
import cn from 'classnames';

import './scss/TodoInput.scss';

const TodoInput = ({ addTodo }) => {

  // 입력창이 열리는 여부를 표현하는 상태값
  const [open, setOpen] = useState(false);

  // 할일 입력창에 입력한 내용을 표현하는 상태값
  const [todoText, setTodoText] = useState('');

  // + 버튼 클릭시 이벤트 처리
  const onToggle = () => {
    setOpen(!open);
  };

  // 서브밋 이벤트 핸들러
  const submitHandler = e => {
    e.preventDefault(); // 태그의 기본기능 제한
    // console.log('폼이 제출됨!!');
    // console.log(todoText);

    addTodo(todoText);

    // 입력이 끝나면 입력창 비우기
    setTodoText('');
  };

  // input change 이벤트 핸들러 함수
  const todoChangeHandler = e => {
    // todoText 에 값 설정 (useState)
    setTodoText(e.target.value);
  };

  const showForm = () => {
    // open 이 true 이면 오른쪽도 실행(검사)
    // open 이 false 이면 오른쪽 무시
      return open && (<div className='form-wrapper'>
                        <form className='insert-form' onSubmit={submitHandler}>
                            <input 
                                type='text'
                                placeholder='할 일을 입력 후, 엔터를 누르세요!'
                                onChange={todoChangeHandler}
                                autoFocus
                                value={todoText}
                            />
                        </form>
                      </div>);
  };

  return (
    <>
      {
        showForm()
      }
      {
        /*
          cn() : 첫번째 파라미터는 항상 유지할 클래스
                 두번째 파라미터는 논리 상태값
                 => 논리상태값이 true 일 경우 해당클래스가 추가
                    false 일 경우 제거
        */
      }
      <button className={cn('insert-btn', {abc:open})} onClick={onToggle}>
        <MdAdd />
      </button>
    </>
  )
}

export default TodoInput
/*.............................*/
	let _actionCuror = false;

	window.addEventListener('mousemove', (e) => {

		let _tail   =      document.querySelector('.tail'),
			_cursor =    document.querySelector('.cursor'),
			_coord  = document.querySelector('.coordLine');

		_tail.setAttribute('style', `left:${e.clientX + 15}px; top:${e.clientY + 15}px`);
		_cursor.setAttribute('style', `left:${e.clientX + 5}px; top:${e.clientY + 5}px`);

			/* - - -*/
		_changeMouseInterfaceColor(_tail, _cursor, _coord);	

			/* - - -*/
		_moveTodle(e.clientX, e.clientY);
	});

		function _changeMouseInterfaceColor(_tail, _cursor, _coord) {

			if (_actionCuror == true) 
			{
				_tail.setAttribute(  'id',   'colorTail');
				_cursor.setAttribute('id',  'sizeCursor');
				_coord.setAttribute( 'id',  'colorCoord');

			}
			else 
			{
				_tail.removeAttribute('id');
				_cursor.removeAttribute('id');
				_coord.removeAttribute('id');
			}	

		}

	let _actionElements = document.getElementsByClassName('actionCursor');
	
	for (let i = 0; i < _actionElements.length; i++) {
		_actionElements[i].addEventListener('mouseover',  () => {
			_actionCuror =  true;
		})
		_actionElements[i].addEventListener('mouseleave', () => {
			_actionCuror = false;
		})
	}

		function _moveTodle(_x, _y){
			
			let _h = document.body.clientHeight;
				_w = document.body.clientWidth;

			let _todle = document.getElementsByClassName('todle');

				if (_y <= _h - 75 && _y >= 75) _todle[0].setAttribute('style', `top:${_y-50}px`);
				if (_x <= _w - 75 && _x >= 75) _todle[1].setAttribute('style', `left:${_x-50}px`);

		}


/*.............................*/

	let _up   =   document.querySelector('.moveUp'), /*....*/
		_down = document.querySelector('.moveDown'), /*....*/
		_count = 0, /*.....................................*/
		_crsCount = document.querySelector('.cursorCounter');

	let _wrapper = document.getElementsByClassName('innerCounter')[0],
		_list = _wrapper.getElementsByTagName('li');

			_up.addEventListener('click', () => {
				if (_count > 0 ) {
					_count--;
					_slideFloorCounter(_count, '-')
				}	
			})

			_down.addEventListener('click', () => {
				if (_count < 4 ) {
					_count++;
					_slideFloorCounter(_count, '+')
				}	
			})

			for (let i = 0; i < _list.length; i++) {
				_list[i].addEventListener('click', () => {
					_count = i;

					document.querySelector('.usingFloor').classList.remove('usingFloor');
					_list[_count].classList.add('usingFloor'); /*......................*/

					_crsCount.setAttribute('style', `top:${52.5 + (_count * 70)}px`);
				})
			}

		function _slideFloorCounter(_index, _action){
			_list[_index].classList.add('usingFloor'); /*..*/

				if (_action == '+') _list[_index - 1].classList.remove('usingFloor');
				else /*..........*/ _list[_index + 1].classList.remove('usingFloor');

			_crsCount.setAttribute('style', `top:${52.5 + (_index * 70)}px`);
		}


/*.............................*/

	let _menuWrapper = document.querySelector('.navMenu'),
		_menu = document.getElementsByTagName('li'); /*.*/

		for (let i = 0; i < _menu.length; i++) {
			_menu[i].addEventListener('click', () => {
				if (_menu[i].classList.contains('activeFilter')) 
				{
					_menu[i].classList.remove('activeFilter');
					hideFilter(_menu[i].getAttribute('dataColor'));
				} 
				else
				{
					_menu[i].classList.add('activeFilter');
					showFilter(_menu[i].getAttribute('dataColor'));
				}
			});
		}

	function showFilter(_color){
		let _array = document.querySelector('#map');
			_rooms = _array.getElementsByClassName('room');

			for (let i = 0; i < _rooms.length; i++){
				if (_rooms[i].getAttribute('dataColor') == _color){
					_rooms[i].classList.add(_color);
				}
			}
	}

	function hideFilter(_color){
		let _array = document.querySelector('#map');

			while (_rooms = _array.querySelector('.'+_color)) _rooms.classList.remove(_color);
	}

/*.............................*/

let _map = document.querySelector('#map'),
	_dragMap = false;

let oldX,
	oldY,
	newX,
	newY;

let _coord = document.querySelector('.floor').getBoundingClientRect();

	_map.addEventListener('mousedown', (e) => {
		 
		_dragMap = true;	

		oldX = e.clientX;
		oldY = e.clientY;
	})

	window.addEventListener('mousemove', (e) => {

		if (_dragMap == true) 
		{
			let pos1 = _coord.left;
			let pos2 = _coord.top;

				newX = pos1 + (e.clientX - oldX);
				newY = pos2 + (e.clientY - oldY);

			document.querySelector('.floor').setAttribute('style', `left:${newX}px; top:${newY}px;`);
		}

	})

	window.addEventListener('mouseup', () => {
		_coord = document.querySelector('.floor').getBoundingClientRect();
		_dragMap = false;	
	})

/*.............................*/

	setEvent("greenColor");

	function setEvent(_color){
		let _rooms = document.getElementsByClassName('room');

			for (let i = 0; i < _rooms.length; i++) 
			{
				if (_rooms[i].getAttribute('dataColor') == "greenColor") 
					_rooms[i].addEventListener('click', () => {
						showRegForm(_rooms[i].getAttribute('indexRoom'), _rooms[i]);
					});
				else  
					_rooms[i].addEventListener('click', () => {
						showRefusedMess();
					});
			}
	}

	var _roomIndex,
		_activBlank;

	function showRegForm(_index, _element){

		_roomIndex  = _index;
		_activBlank = _element;

		let _form = document.querySelector('.greenForm');
			_form.removeAttribute('style');

			_form.querySelector('.title').innerHTML = "Комната #" + _index;
	}

	function showRefusedMess(){
		let _form = document.querySelector('.greenForm');
			_form.setAttribute('style', 'display: none');
	}


/*.............................*/

	let _submit = document.querySelector('.submit').addEventListener('click', () => {
		_activBlank.setAttribute('dataColor', 'yellowColor');
		_activBlank.addEventListener('click', () => {
			showRefusedMess();
		});
	});

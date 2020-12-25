const filterByType = (type, ...values) => values.filter(value => typeof value === type), // функция фильтра по типу с переводом в его значение

	hideAllResponseBlocks = () => { // функция скрывающая все отзывчивые блоки
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // определение переменной и и присваивание ей класса с DOM-дерева
		responseBlocksArray.forEach(block => block.style.display = 'none'); // здесь перебор массива и для каждого найденного срыть блок через стиль дисплей ноне
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // функция - показать скрытый блок по трем параметрам
		hideAllResponseBlocks(); // скрыть блок
		document.querySelector(blockSelector).style.display = 'block'; // отразить блок селектора
		if (spanSelector) { // если спанселектор существует применить к его текстконтенту значение msgText
			document.querySelector(spanSelector).textContent = msgText; // получение знгачения spanSelector
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // функция отражения неправильного результата

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),  // функция отражения правильного результата

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),  // функция отражения что результата нет

	tryFilterByType = (type, values) => { // функция фильтрации по типу
		try { // try-catch конструкция помогающая продолжаению выполнения других функций и условий
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // здесь идет фильтр по типу с присвоением значения и его перечисление через запятую 
			const alertMsg = (valuesArray.length) ? // функция вывода сообщений для пользователя
				`Данные с типом ${type}: ${valuesArray}` : // вывод типа данных со результатом значений
				`Отсутствуют данные типа ${type}`; // вывод информации, что данные данного типа нет 
			showResults(alertMsg); // вызов функции ок
		} catch (e) {
			showError(`Ошибка: ${e}`); // отлавливает ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); // определение переменной, получаем данные кнопки

filterButton.addEventListener('click', e => { // вешаем на кнопку слушатель событий
	const typeInput = document.querySelector('#type'); // получаем данные селекта
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});


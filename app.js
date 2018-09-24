angular.module('mifTest', [])
  .controller('MainCtrl', function MainCtrl() {

  })
  .component('eye', {
    templateUrl: 'eye.html',
    controller: function(){
      var elem = document.getElementById('pupil');
      topCoor = getCoords(elem).topCoor;
      leftCoor = getCoords(elem).leftCoor;

      window.onload = init;
      function init() {
      	if (window.Event) {
      	document.captureEvents(Event.MOUSEMOVE);
      	}
      	document.onmousemove = getCursorXY;
      }

      function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
          topCoor: box.top + pageYOffset,
          leftCoor: box.left + pageXOffset
        };
      }

      function getCursorXY(e) {
        posiX = e.pageX;
        posiY = e.pageY;
        elem.style.top = (posiY - topCoor) / 15 + 52 + 'px';
        elem.style.left = (posiX - leftCoor) / 15 + 53 + 'px';
      }
    }
  })
  .component('booksList', {
    templateUrl: 'books-list.html',
    controller: function(){
      ctrl = this;
      var dragSrcEl = null;
      ctrl.book = {};
      ctrl.books = [
        {img:'img/cover1.png', description:'Краткая история почти ничего. Эта книга — недоразуменье.'},
        {img:'img/cover.png', description:'Все знания о вселенной компактно упакованы на одной странице.'},
        {img:'img/cover3.png', description:'Автор подробно, всего двумя фразами, объясняет все.'},
        {img:'img/cover4.png', description:'Двоичные рамышления о жизни после пресса.'},
        {img:'img/cover5.png', description:'Прозначные тексты на мутные темы.'},
        {img:'img/cover6.png', description:'О чем спросить первого встречного мутанта с другой планеты. Руководство по умиранию.'},
        {img:'img/cover7.png', description:'Технические чертежи и детали самого лучшего робота на свете.'},
        {img:'img/cover8.png', description:'Коротко и ясно. Кому не ясно - Люрр объяснит. Коротко.'},
      ];
      ctrl.addMoreBooks = function() {
        let newBooks = shuffle(ctrl.books.concat(ctrl.books).concat(ctrl.books).slice(0,20));
        ctrl.books = ctrl.books.concat(newBooks);
      };

      function shuffle(a) {
          for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
      }

      function handleDragStart(e) {
        this.classList.add('hold');
        this.style.opacity = 0.05;
        console.log('trig');
        console.log(e.dataTransfer);
        //this.style.visibility = 'hidden';
        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
      }

      function handleDragOver(e) {
        if (e.preventDefault) {
          e.preventDefault(); // Necessary. Allows us to drop.
        }
        this.classList.add('over');
        console.log('over');
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

        return false;
      }

      function handleDrop(e) {
        // this / e.target is current target element.

        if (e.stopPropagation) {
          e.stopPropagation(); // stops the browser from redirecting.
        }
        if (dragSrcEl != this) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
          }
        // See the section on the DataTransfer object.

        return false;
      }

      function handleDragEnter(e) {
        // this / e.target is the current hover target.
        //e.fromElement.add('hold')
        this.classList.add('over');

        console.log('enter');
        //console.log(e)
      }

      function handleDragLeave(e) {
        this.classList.remove('over');
        this.classList.remove('hold');
          // this / e.target is previous target element.
        console.log('leave');
      }

      function handleDragEnd(e) {
        // this/e.target is the source node.
        var cols = document.querySelectorAll('.book-block');
        [].forEach.call(cols, function (col) {
          col.classList.remove('over');
          col.classList.remove('hold');
        });
      }

      function ngRepeatFinished(){
        var cols = document.querySelectorAll('.book-block');
          [].forEach.call(cols, function(col) {
            col.addEventListener('dragstart', handleDragStart, false);
            col.addEventListener('dragenter', handleDragEnter, false);
            col.addEventListener('dragover', handleDragOver, false);
            col.addEventListener('dragleave', handleDragLeave, false);
            col.addEventListener('drop', handleDrop, false);
            col.addEventListener('dragend', handleDragEnd, false);
          });

        console.log(cols.length);
      }

      ctrl.ngRepeatFinished = ngRepeatFinished;

    }
  });

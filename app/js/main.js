window.onload = function () {

	// new Slider({
	// 	images: '.slider1 img',
	// 	prev: '.controls1 .prev',
	// 	next: '.controls1 .next',
	// 	auto: true
	// });

	// new Slider({
	// 	images: '.slider2 img',
	// 	prev: '.controls2 .prev',
	// 	next: '.controls2 .next',
	// 	auto: false
	// });

	// new Slider({
	// 	images: '.slider3 img',
	// 	prev: '.controls3 .prev',
	// 	next: '.controls3 .next',
	// 	auto: true
	// });


	function Slider(obj) {
		this.images = document.querySelectorAll(obj.images);
		this.btn_prev = obj.prev;
		this.btn_next = obj.next;
		this.auto = obj.auto;
		var counter = 0;
		var sl = this;

		this.prev = function() {
			sl.images[counter].classList.remove('active');
			counter--;
			if (counter < 0) {
				counter = sl.images.length - 1;
			}
			sl.images[counter].classList.add('active');
		}

		this.next = function() {
			sl.images[counter].classList.remove('active');
			counter++;

			if (counter >= sl.images.length) {
				counter = 0;
			}

			sl.images[counter].classList.add('active');
		}

		document.querySelector(this.btn_prev).addEventListener('click', this.prev);
		document.querySelector(this.btn_next).addEventListener('click', this.prev);

		if (this.auto) {
			setInterval(this.next, 1000);
		} else {
			//console.log('autoplay is not enabled!');
		}

	}






/////////////////////



var content1 = "<h1>Modal title</h1><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et accusantium odit quis possimus. Ullam voluptatibus temporibus molestiae dolores laudantium alias, quam at libero perspiciatis, ipsam neque fugit nostrum facere fugiat esse reprehenderit tempore culpa expedita! Reiciendis sequi dolor, necessitatibus voluptatibus non vitae, quidem asperiores amet id itaque, labore eos ut.</p><p><br></p><p><strong>Modal end</strong></p>";
var content2 = '12345';
var content3 = 'bgdbdfb zfdbfbxfbxdb vzsdfvbgasera dagbsodfj bgasdfbs';

var btn1 = document.querySelector('#popup1');
var btn2 = document.querySelector('#popup2');
var btn3 = document.querySelector('#popup3');

var p1 = new Popup(content1,btn1);
var p2 = new Popup(content2,btn2);
var p3 = new Popup(content3,btn3);


function Popup(content, selector) {

	this.content = content;
	this.selector = selector;


	var body = document.querySelector('body');
	var p_wrap = document.createElement('div');
	var p_modal = document.createElement('div');
	var context = this;

	p_wrap.classList.add('wrap');
	p_modal.classList.add('modal');
	p_modal.innerHTML = this.content;

	body.append(p_wrap);
	p_wrap.append(p_modal);

	this.open = function(){
		p_wrap.classList.add('wrap--open');
	}

	this.close = function(){
		p_wrap.classList.remove('wrap--open');
	}

	if (this.selector) {
		this.selector.addEventListener('click', this.open);
	}

	p_wrap.addEventListener('click', function(e){
		if (e.target == p_wrap) {
			context.close();
		}
	});

}



let timer;

window.onscroll = function(){
	clearTimeout(timer);
	let timer = setTimeout(log, 200);
}


function log(){
	console.log('event!');
}






}


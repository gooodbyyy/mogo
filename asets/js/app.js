$(function() {
    /*когда мы скроллим страницу у нас выводится в консоль высота экрана
    создаем переменные header и introH, которым соответственно присваиваем id тегов из html-документа
    в introH через функцию .innerHeight() измеряем высоту блока для того, чтобы средствами
    JS постоянно оставлять этот блок вверху окна при скролле.*/
    var header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();
    /*FIXED HEADER */
    /*как только зашли на страницу, проверился отступ скрола, чтобы показать или не показывать
    хедер. Это поможет, если мы перезагрузили страницу будучи на средине сайта, тогда
    хедер возникнет сразу, а не с началом скроллинга */
    checkScroll(scrollOffset);
    /*scrollOffset это высота, на которую мы скроллим. Как только она станет больше
    высоты блока хедер, т.е. introH, то включается класс .fixed (см.он прописан в CSS файле) и
    блок хедер становится фиксированным в верхней части экрана. В обратном случае .fixed не проявляется*/
    $(window).on("scroll", function() {
        checkScroll(scrollOffset);
    });

    function checkScroll() {
        scrollOffset = $(this).scrollTop();
        if (scrollOffset >= introH) {
            header.addClass("fixed")
        } else {
            header.removeClass("fixed")
        }
    }
    /*SMUTH SCROLL*/
    /**Делаем так, чтобы кнопки навигации плавно перебрасывали нас на нужные блоки сайта*/
    /**При клике на элемент data-scroll будет выполняться действие*/
    $("[data-scroll]").on("click", function(event) {
        /**выполняется событие по умолчанию */
        event.preventDefault();
        var $this = $(this),
            /**сохраняем в переменную .data('scroll') при клике в определенную область (поскольку this) */
            blockId = $this.data('scroll'),
            /**в этой переменной сохраняем позицию элемента $(blockId) от верха страницы */
            blockOffset = $(blockId).offset().top;
        /**Чтобы все нажатые ссылки не оставались активными на постоянно, т.е. не
        сохраняли изменение цвета, мы должны убрать у них класс active*/
        $("#nav a").removeClass("active")
            /**для ссылки, на которую нажали, придидим класс active,т.е. активная ссылка меняет цвет */
        $this.addClass("active");
        /**к положению в пикселях от верха окна, которое отобразилось в переменной blockOffset
         нужно плавно проскроллить. 500 - это миллисекунды времени скролла.*/
        $("html,body").animate({
            scrollTop: blockOffset
        }, 500);

    });

    /*MENU NAV TOGGLE (HAMBURGER)*/
    /**следим за кликом по кнопке меню nav_toggle */
    $("#nav_toggle").on("click", function(event) {
        event.preventDefault(); //убираем стандартное поведение кнопки
        $(this).toggleClass("active") //добавляем либо убираем класс active,гамбургер превращается в крестик и наоборот
        $("#nav").toggleClass("active") //добавляем либо убираем класс active,меню выпадает и сворачивается
    });

    /*COLLAPSE (ACCORDION) */
    /**Порядок такой. 1. Жмем на элемент с data-collapse 2. Как только он произошел, сохраняем результат в переменную. 3. Этот результат либо показываем, либо скрываем.  */
    /**следим за кликом по элементу с атрибутом data-collapse */
    $("[data-collapse]").on("click", function(event) {
        event.preventDefault(); //убираем стандартное поведение кнопки
        var $this = $(this),
            /**сохраняем в переменную $this значение data-collapse - это blockId */
            blockId = $this.data('collapse');
        /**даем или убираем нашему this класс active, контент віпадает или сворачивается */
        $this.toggleClass("active");

    });

    /*SLIDER*/
    /**к атрибуту data-slider привяжем загруженый нами в HTML файл слайдер slick */
    $("[data-slider]").slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});
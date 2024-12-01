jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  /* --------------------------------------------
   * 　ローディングアニメーション
   * -------------------------------------------- */
  window.addEventListener("load", () => {
    // ページの完全な読み込み後にスクロール位置をトップに移動
    setTimeout(() => {
      window.scrollTo(0, 0); // スクロール位置をトップに設定
    }, 100); // 100ミリ秒の遅延を加えてスクロール

    const intro = document.querySelector(".js-Loading");
    const swiperContainer = document.querySelector(".js-mv");

    if (!intro || !swiperContainer) {
      console.error("要素が見つかりません");
      return;
    }

    // 画像とタイトルのアニメーション開始
    setTimeout(() => {
      intro.classList.add("active"); // `active` クラスを付与
      console.log("active クラスを付与しました");
    }, 500); // ページ読み込み後0.5秒で開始

    // 画像とタイトルアニメーション完了後
    setTimeout(() => {
      try {
        // 初期表示が終わったらイントロを非表示
        intro.style.display = "none";

        // mvセクションにblockを付与
        swiperContainer.style.display = "block";

        // Swiperの初期化をmvが表示された後に行う
        const swiperMv = new Swiper(".js-swiper--mv", {
          loop: true, // ループ
          speed: 2500, // ゆっくり
          autoplay: {
            delay: 1000, // 1秒後に次のスライド（初期値：3000）
            disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
          },
          effect: "fade", // フェード
          slidesPerView: 1, // 一度に表示する枚数
        });

        console.log("Swiperインスタンス:", swiperMv);

        // タイトルテキストの表示
        setTimeout(() => {
          swiperContainer.classList.add("show");
        }, 500); // Swiper表示後にタイトルアニメーション
      } catch (error) {
        console.error("処理中にエラー:", error);
      }
    }, 4000); // 画像とタイトルアニメーション完了後
  });

  /* --------------------------------------------
   * 　Swiper_mv
   * -------------------------------------------- */
  // const swiperMv = new Swiper(".swiper--mv", {
  //   // ループ
  //   loop: true,
  //   // ゆっくり
  //   speed: 2500,
  //   // 前後の矢印
  //   // navigation: {
  //   //   nextEl: ".swiper-button-next",
  //   //   prevEl: ".swiper-button-prev",
  //   // },
  //   // 自動再生
  //   autoplay: {
  //     delay: 1000, // 1秒後に次のスライド（初期値：3000）
  //     disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
  //   },
  //   // フェード
  //   effect: "fade",
  //   // 一度に表示する枚数
  //   slidesPerView: 1,
  //   // スライド間の距離
  //   // spaceBetween: 24,
  // });

  /* --------------------------------------------
   * 　Swiper_Campaign
   * -------------------------------------------- */
  const swiperCampaign = new Swiper(".js-swiper--Campaign", {
    // ループ
    loop: true,
    // ゆっくり
    speed: 1500,
    // 前後の矢印
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // 自動再生
    autoplay: {
      delay: 1000, // 1秒後に次のスライド（初期値：3000）
      disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    },
    // レスポンシブ対応設定
    breakpoints: {
      // 768px未満の場合（デフォルトの設定）
      0: {
        slidesPerView: 1.26, // 一度に表示する枚数
        spaceBetween: 24, // スライド間の距離
      },
      // 768px以上の場合
      768: {
        slidesPerView: 3.2, // 一度に表示する枚数
        spaceBetween: 30, // スライド間の距離
        // centeredSlides: true, // 中央揃え
        initialSlide: 1, // 初期スライドを1枚目に設定
      },
      // 1200px以上の場合
      1200: {
        slidesPerView: 3.48, // 一度に表示する枚数
        spaceBetween: 40, // スライド間の距離
        // centeredSlides: true, // 中央揃え
        initialSlide: 1, // 初期スライドを1枚目に設定
      },
    },
  });
  /* --------------------------------------------
   * 　ドロワーメニュー
   * -------------------------------------------- */
  $(function () {
    let scrollPosition = 0;

    $(".js-Hamburger").click(function () {
      $(this).toggleClass("active");

      if ($(this).hasClass("active")) {
        // 現在のスクロール位置を取得して保存
        scrollPosition = $(window).scrollTop();

        // スクロール固定: bodyに固定スタイルを追加してスクロールを無効化
        $("body").css({
          position: "fixed",
          top: `-${scrollPosition}px`,
          width: "100%",
        });

        // ナビゲーションメニューにactiveクラスを追加
        $(".js-Sp-nav").addClass("active");
        $(".Header__inner").addClass("active");
      } else {
        // スクロール固定解除
        $("body").css({
          position: "",
          top: "",
        });
        // もとのスクロール位置に戻す
        $(window).scrollTop(scrollPosition);

        // ナビゲーションメニューからactiveクラスを削除
        $(".js-Sp-nav").removeClass("active");
        $(".Header__inner").removeClass("active");
      }
    });
  });

  /* --------------------------------------------
   * 　ヘッダー下に移動したらヘッダーの色変える
   * -------------------------------------------- */
  $(document).ready(function () {
    var headerHeight = $(".js-Header").outerHeight(); // ヘッダーの高さを取得
    // var mainViewBottom = $("header").offset().top + $(".Campaign__inner").outerHeight();
    var mainViewBottom = $("header").offset().top + window.innerHeight;
    $(window).on("scroll", function () {
      var scrollPosition = $(this).scrollTop(); // 現在のスクロール位置を取得

      // メインビューが見えなくなったらクラスを追加
      if (scrollPosition + headerHeight > mainViewBottom) {
        $(".Header__inner").addClass("Header__inner--scrolled");
        $(".Pc-nav__Link").addClass("Pc-nav__Link--scrolled");
      } else {
        $(".Header__inner").removeClass("Header__inner--scrolled");
        $(".Pc-nav__Link").removeClass("Pc-nav__Link--scrolled");
      }
    });
  });
  /* --------------------------------------------
   * 　スクロールアニメーション(画像)
   * -------------------------------------------- */
  //要素の取得とスピードの設定
  var box = $(".ScrollImgBox"),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="ScrollImgBox__Animation"></div>');
    var color = $(this).find($(".ScrollImgBox__Animation")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });

  /* --------------------------------------------
   * 　一番上に移動する矢印
   * -------------------------------------------- */
  // 要素の取得
  const backToTopButton = document.querySelector(".js-Contact__BacktoTop");
  const specialScreen = document.querySelector(".js-Contact");

  // 初期位置の取得
  const initialPosition = backToTopButton.offsetTop;

  // スクロールイベントを監視
  window.addEventListener("scroll", () => {
    // スクロール位置が初期位置を超えたらボタンを固定
    if (window.scrollY > initialPosition) {
      backToTopButton.classList.add("fixed");
    } else {
      backToTopButton.classList.remove("fixed");
    }

    // 特定の画面（要素）が画面内に入ったときに固定を解除
    const rect = specialScreen.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      // 特定の画面が表示されている場合、ボタンの固定を解除
      backToTopButton.classList.remove("fixed");
    } else {
      // 特定の画面が表示されていない場合、固定を再度有効にする
      if (window.scrollY > initialPosition) {
        backToTopButton.classList.add("fixed");
      }
    }
  });

  // 上部に戻る処理
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0, // ページの最上部
      behavior: "smooth", // スムーズなスクロール
    });
  });
});

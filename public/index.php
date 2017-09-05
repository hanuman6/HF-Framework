<?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/const.php')/* const */ ?>
<!doctype html>
<html lang="ja" class="no-js">
<head>
  <title>Home | <?php echo site::title; ?></title>
  <?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/meta.php')/* meta */ ?>
  <?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/ogp.php')/* ogp */ ?>
  <?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/css.php')/* css */ ?>
</head>

<body>
  <?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/ga.php')/* analytics */ ?>
  <?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/fb.php')/* facebook page plugin */ ?>
  <div class="page">
    <?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/header.php')/* header */ ?>
    <div class="contents">
      コンテンツ
    </div>
    <!-- .contents -->
    <?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/footer.php')/* footer */ ?>
  </div>
  <!-- /.page -->
  <?php include($_SERVER[ 'DOCUMENT_ROOT'] . '/common/inc/js.php')/* js */ ?>
</body>
</html>

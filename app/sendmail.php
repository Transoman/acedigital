<?php

  if ($_POST) {
    if ($_POST['r2d2'] == '' ) {

      require 'bat/PHPMailer/src/Exception.php';
      require 'bat/PHPMailer/src/PHPMailer.php';
      require 'bat/PHPMailer/src/SMTP.php';

      $mail = new PHPMailer(true);

      $SITE_TITLE = 'Ace Digital';

      try {
        //Server settings
        $mail->SMTPDebug = 2;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'user@example.com';                 // SMTP username
        $mail->Password = 'secret';                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
        $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
        $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
        $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';

        $to = 'Elena357910@yandex.com';

        $data = '<h1>'.$subject."</h1>";
        $data .= 'Имя: '.$name."<br>";
        $data .= 'Email: '.$email."<br>";
        $data .= 'Телефон: '.$phone."<br>";

        $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
        ".$data."
        <br>\n
        <hr>\n
        <br>\n
        <small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";

        //Recipients
        $mail->setFrom('from@example.com', 'Mailer');
        $mail->addAddress($to, $SITE_TITLE);     // Add a recipient

        //Attachments
        $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = '';

        $mail->send();
        echo 'Message has been sent';
      } catch (Exception $e) {
          echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
      }

    }
  }
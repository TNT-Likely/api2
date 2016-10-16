<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Actionable emails e.g. reset password</title>
  <link href="styles.css" media="all" rel="stylesheet" type="text/css" />
</head>

<body itemscope itemtype="http://schema.org/EmailMessage">
  <table class="body-wrap">
    <tr>
      <td></td>
      <td class="container" width="600">
        <div class="content">
          <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction">
            <tr>
              <td class="content-wrap">
                <meta itemprop="name" content="Confirm Email" />
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                    尊敬的{{email}}:
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block">
                      请点击下面的链接确认您的电子邮件地址.
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
                      <a href="{{token}}" class="btn-primary" itemprop="url">确认邮箱地址</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block">
                      &mdash; Youths网
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </td>
      <td></td>
    </tr>
  </table>
</body>

</html>

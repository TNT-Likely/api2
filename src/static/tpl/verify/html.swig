{% extends '../layout.swig' %}
{%block content %}<tr>
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
                  </tr>{% endblock %}
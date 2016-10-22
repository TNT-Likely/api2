{% extends '../layout.swig' %}
{%block content %}<tr>
                    <td class="content-block">
                    尊敬的{{email}}:
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block">
                     请点击下面的链接修改你的密码.
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
                      <a href="{{token}}" class="btn-primary" itemprop="url">修改密码</a>
                    </td>
                  </tr>{% endblock %}
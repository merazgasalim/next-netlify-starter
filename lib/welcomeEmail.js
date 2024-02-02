export default function welcomeEmail(name) {
    return `
      <!DOCTYPE html>
  <html
    style="
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      font-size: 14px;
      margin: 0;
    "
  >
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Welcome to incolive</title>
      <style type="text/css">
        img {
          max-width: 100%;
        }
        body {
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: none;
          width: 100% !important;
          height: 100%;
          line-height: 1.6em;
        }
        body {
          background-color: #f6f6f6;
        }
        @media only screen and (max-width: 640px) {
          body {
            padding: 0 !important;
          }
          h1 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
          h2 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
          h3 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
          h4 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
          h1 {
            font-size: 22px !important;
          }
          h2 {
            font-size: 18px !important;
          }
          h3 {
            font-size: 16px !important;
          }
          .container {
            padding: 0 !important;
            width: 100% !important;
          }
          .content {
            padding: 0 !important;
          }
          .content-wrap {
            padding: 10px !important;
          }
          .invoice {
            width: 100% !important;
          }
        }
      </style>
    </head>
  
    <body
      itemscope
      itemtype="http://schema.org/EmailMessage"
      style="
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        box-sizing: border-box;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;
        width: 100% !important;
        height: 100%;
        line-height: 1.6em;
        background-color: #f6f6f6;
        margin: 0;
      "
      bgcolor="#f6f6f6"
    >
      <table
        class="body-wrap"
        style="
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          box-sizing: border-box;
          font-size: 14px;
          width: 100%;
          background-color: #f6f6f6;
          margin: 0;
        "
        bgcolor="#f6f6f6"
      >
        <tr
          style="
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
            margin: 0;
          "
        >
          <td
            style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              box-sizing: border-box;
              font-size: 14px;
              vertical-align: top;
              margin: 0;
            "
            valign="top"
          ></td>
          <td
            class="container"
            width="600"
            style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              box-sizing: border-box;
              font-size: 14px;
              vertical-align: top;
              display: block !important;
              max-width: 600px !important;
              clear: both !important;
              margin: 0 auto;
            "
            valign="top"
          >
            <div
              class="content"
              style="
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                box-sizing: border-box;
                font-size: 14px;
                max-width: 600px;
                display: block;
                margin: 0 auto;
                padding: 20px;
              "
            >
              <table
                class="main"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  box-sizing: border-box;
                  font-size: 14px;
                  border-radius: 3px;
                  background-color: #fff;
                  margin: 0;
                  border: 1px solid #e9e9e9;
                "
                bgcolor="#fff"
              >
              <tr>
                  <td align="center" valign="top">
                    <table
                      align="center"
                      width="650"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      class="em_main_table"
                      style="width: 650px; table-layout: fixed"
                    >
                      <tr>
                        <td
                          align="center"
                          valign="top"
                          style="padding: 0 25px"
                          class="em_aside10"
                        >
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                            align="center"
                          >
                            <tr>
                              <td height="26" style="height: 26px" class="em_h20">
                                &nbsp;
                              </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                <a
                                  href="#"
                                  target="_blank"
                                  style="text-decoration: none"
                                  ><img
                                    src="https://incolive.com/brand/logo.png"
                                    width="110"
                                    height="30"
                                    alt="incolive"
                                    border="0"
                                    style="
                                      display: block;
                                      font-family: Arial, sans-serif;
                                      font-size: 18px;
                                      line-height: 25px;
                                      text-align: center;
                                      color: #1d4685;
                                      font-weight: bold;
                                      max-width: 208px;
                                    "
                                    class="em_w150"
                                /></a>
                              </td>
                            </tr>
                            <tr>
                              <td height="28" style="height: 28px" class="em_h20">
                                &nbsp;
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr
                  style="
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    box-sizing: border-box;
                    font-size: 14px;
                    margin: 0;
                  "
                >
                  <td
                    class="alert alert-warning"
                    style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 16px;
                      vertical-align: top;
                      color: #fff;
                      font-weight: 500;
                      text-align: center;
                      border-radius: 3px 3px 0 0;
                      background-color: #ff9f00;
                      margin: 0;
                      padding: 20px;
                    "
                    align="center"
                    bgcolor="#FF9F00"
                    valign="top"
                  >
                    Your registration for incolive has been confirmed!
                  </td>
                </tr>
                <tr
                  style="
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    box-sizing: border-box;
                    font-size: 14px;
                    margin: 0;
                  "
                >
                  <td
                    class="content-wrap"
                    style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 14px;
                      vertical-align: top;
                      margin: 0;
                      padding: 20px;
                    "
                    valign="top"
                  >
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: 'Helvetica Neue', Helvetica, Arial,
                          sans-serif;
                        box-sizing: border-box;
                        font-size: 14px;
                        margin: 0;
                      "
                    >
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          Hi ${name},
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          Thank you for signing up to use incolive. We built
                          <strong
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              margin: 0;
                            "
                            >incolive</strong
                          >
                          to make your learning experience more than watching
                          videos or reading books. We did our best to give our
                          students an
                          <strong
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              margin: 0;
                            "
                            >interactive, collabarotive and live</strong
                          >
                          learning experience
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          incolive is different because we believe that
                          <strong
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              margin: 0;
                            "
                            >Learners are the center of the teaching-learning
                            process</strong
                          >
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          <a
                            href="https://incolive.com/courses"
                            class="btn-primary"
                            style="
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              color: #fff;
                              text-decoration: none;
                              line-height: 2em;
                              font-weight: bold;
                              text-align: center;
                              cursor: pointer;
                              display: inline-block;
                              border-radius: 5px;
                              text-transform: capitalize;
                              background-color: #348eda;
                              margin: 0;
                              border-color: #348eda;
                              border-style: solid;
                              border-width: 10px 20px;
                            "
                            >Check courses</a
                          >
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Arial,
                              sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          Thanks for choosing incolive.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div
                class="footer"
                style="
                  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  box-sizing: border-box;
                  font-size: 14px;
                  width: 100%;
                  clear: both;
                  color: #999;
                  margin: 0;
                  padding: 20px;
                "
              >
                <table
                  width="100%"
                  style="
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    box-sizing: border-box;
                    font-size: 14px;
                    margin: 0;
                  "
                >
                  <tr
                    style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 14px;
                      margin: 0;
                    "
                  >
                    <td
                      class="aligncenter content-block"
                      style="
                        font-family: 'Helvetica Neue', Helvetica, Arial,
                          sans-serif;
                        box-sizing: border-box;
                        font-size: 12px;
                        vertical-align: top;
                        color: #999;
                        text-align: center;
                        margin: 0;
                        padding: 0 0 20px;
                      "
                      align="center"
                      valign="top"
                    >
                      <a
                        href="https://incolive.com/"
                        style="
                          font-family: 'Helvetica Neue', Helvetica, Arial,
                            sans-serif;
                          box-sizing: border-box;
                          font-size: 12px;
                          color: #999;
                          text-decoration: underline;
                          margin: 0;
                        "
                        >incolive.com</a
                      >
                      Copyright © incolive. All rights reserved
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
          <td
            style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              box-sizing: border-box;
              font-size: 14px;
              vertical-align: top;
              margin: 0;
            "
            valign="top"
          ></td>
        </tr>
      </table>
    </body>
  </html>
  
      `;
  }
  
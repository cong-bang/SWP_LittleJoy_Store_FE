import React from "react";
import "../../assets/css/styleforgot_password.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Forgotpass1() {
  return (
    <>
      <section class="my-xl-5">
        <div class="container">
          <div class="row">
            <div class="col-md-12 d-flex justify-content-around">
              <div class="w-50 px-3 py-5 box-forgot">
                <p class="forgot-title text-center content-forgot">
                  Reset Password
                </p>
                <div class="d-flex justify-content-center">
                  <table class="w-50">
                    <tbody>
                      <tr>
                        <td colspan="3">Email</td>
                      </tr>
                      <tr>
                        <td class="w-70 py-2">
                          <input
                            class="w-100 ps-2"
                            type="text"
                            placeholder="example@gmail.com"
                            name="email"
                          />
                        </td>
                        <td class="w-20">
                          <div
                            class="text-center btn-send w-75 float-end"
                            onclick="startCountdown(this)"
                          >
                            <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
                          </div>
                        </td>
                        <td class="w-10">
                          <div class="w-100 countdown-box hidden">
                            <p class="countdown m-0 float-end">30s</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3">OTP Code (send via Email)</td>
                      </tr>
                      <tr>
                        <td colspan="2" class="py-2">
                          <input
                            class="w-100"
                            type="text"
                            placeholder=""
                            name="otp"
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr class="hidden-error">
                        <td colspan="3">
                          <p class="text-error m-0">OTP không đúng</p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="py-2">
                          <input
                            class="w-100 btn-continue p-1"
                            type="submit"
                            value="CONTINUE"
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colspan="3" class="py-2">
                          Không nhận được mail? Hãy thử lại
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

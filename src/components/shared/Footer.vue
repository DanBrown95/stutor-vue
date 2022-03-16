<template>
    <div class="footer">
        <div class="contain">
            <div class="col">
                <h1>Company</h1>
                <ul>
                    <li>About Us</li>
                    <router-link tag="li" :to="{name: 'Careers'}">Careers</router-link>
                    <router-link tag="li" :to="{name: 'PrivacyPolicy'}">Privacy Policy</router-link>
                    <router-link tag="li" :to="{name: 'TermsOfUse'}">Terms of Service</router-link>
                </ul>
            </div>
            <div class="col">
                <h1>Experts</h1>
                <ul>
                    <li>Learn More</li>
                    <router-link tag="li" :to="{ name: 'ExpertRegistration' }">Join Up</router-link>
                </ul>
            </div>
            <div class="col">
                <h1>Accounts</h1>
                <ul>
                </ul>
            </div>
            <div class="col">
                <h1>Resources</h1>
                <ul>
                    <router-link tag="li" :to="{ name: 'TopicRequest' }">Request a topic</router-link>
                </ul>
            </div>
            <div class="col">
                <h1>Support</h1>
                <ul>
                    <router-link tag="li" :to="{ name: 'ContactUs' }">Contact Us</router-link>
                    <li class="purechat-button-expand">Web Chat</li>
                </ul>
            </div>
            <div class="col social">
                <h1>Social</h1>
                <ul>
                    <li><a href="https://twitter.com/Stutor9"><img src="../../assets/social-media/twtt.png" class="social-img" ></a></li>
                    <li><a href="https://facebook.com/Stutor-107227027650859"><img src="../../assets/social-media/fbook.png" class="social-img" ></a></li>
                    <li><a href="https://instagram.com"><img src="../../assets/social-media/ig.png" class="social-img" ></a></li>
                </ul>
            </div>
            <div class="clearfix"></div>
        </div>
        <p>© {{ currentYear }} Stutor • All rights reserved.</p>
    </div>
</template>

<script>
export default {
  computed: {
    currentYear: function () {
      return new Date().getFullYear();
    },
  }
}
</script>

<style scoped>

  .footer {
    width: 100%;
    /* position: relative; */
    height: auto;
    background-color: #f3ba09;
  }

.footer .col {
  width: 190px;
  height: auto;
  float: left;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 0px 20px 20px 20px;
}
.footer .col h1 {
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 12px;
  line-height: 17px;
  padding: 20px 0px 5px 0px;
  color: black;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.25em;
}
.footer .col ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.footer .col ul li {
  color: white;
  font-size: 14px;
  font-family: inherit;
  font-weight: bold;
  padding: 5px 0px 5px 0px;
  cursor: pointer;
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}
.social ul li {
  display: inline-block;
  padding-right: 5px !important;
}

.footer .col ul li:hover {
  color: #999999;
  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
}
.clearfix {
  clear: both;
}
.footer > p {
  text-align: center;
  font-size: smaller;
  color: white;
}
.social-img {
  width: 32px;
}
@media only screen and (min-width: 1280px) {
  .contain {
    width: 1200px;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 1139px) {
  .contain .social {
    width: 1000px;
    display: block;
  }
  .social h1 {
    margin: 0px;
  }
}
@media only screen and (max-width: 950px) {
  .footer .col {
    width: 33%;
  }
  .footer .col h1 {
    font-size: 14px;
  }
  .footer .col ul li {
    font-size: 13px;
  }
}
@media only screen and (max-width: 500px) {
  .footer .col {
    width: 50%;
  }
  .footer .col h1 {
    font-size: 14px;
  }
  .footer .col ul li {
    font-size: 13px;
  }
}
@media only screen and (max-width: 340px) {
  .footer .col {
    width: 100%;
  }
}

</style>
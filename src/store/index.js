import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tz_timezones: [
      {
          text: 'Hawaii Standard Time',
          value: 'Pacific/Honolulu',
      },{
          text: 'Alaska Daylight Time',
          value: 'America/Anchorage',
      },{
          text: 'Pacific Daylight Time',
          value: 'America/Los_Angeles',
      },{
          text: 'Mountain Standard Time (MST)',
          value: 'America/Phoenix',
      },{ 
          text: 'Mountain Daylight Time (MDT)', 
          value: 'America/Denver',
      },{
          text: 'Central Time (US and Canada)',
          value: 'America/Chicago'
      },{
          text: 'Eastern Daylight Time',
          value: 'America/New_York'
      }
    ],
    categories: [
      {
          "Id": 1,
          "Name": "Food",
          "ImageUrl": "data:image/png;base64,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"
      },{
          "Id": 2,
          "Name": "Technology",
          "ImageUrl": "https://www.kindpng.com/picc/m/73-730024_advanced-technology-icon-png-transparent-png.png"
      },{
          "Id": 7,
          "Name": "Teaching",
          "ImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRonucS-TKL32c2SI12lNkoBKYinxp3kmQdOW7V2ZY7iK5adfGh&usqp=CAU"
      },{
          "Id": 3,
          "Name": "Health",
          "ImageUrl": "https://i.pinimg.com/originals/f4/c9/a8/f4c9a88e93317977c3d0921b12309578.png"
      },{
          "Id": 4,
          "Name": "Automotive",
          "ImageUrl": "data:image/png;base64,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"
      },{
          "Id": 5,
          "Name": "Geography",
          "ImageUrl": "data:image/png;base64,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"
      },{
          "Id": 6,
          "Name": "Sports",
          "ImageUrl": "data:image/png;base64,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"
      },{
        "Id": 8,
        "Name": "Programming",
        "ImageUrl": "https://www.kindpng.com/picc/m/73-730024_advanced-technology-icon-png-transparent-png.png"
      }],
    topics: [
      {
          "Id": 1,
          "CategoryId": 2,
          "Name": "Programming",
      },{
          "Id": 2,
          "CategoryId": 2,
          "Name": "Computers",
      },{
          "Id": 7,
          "CategoryId": 2,
          "Name": "Video Games",
      },{
          "Id": 3,
          "CategoryId": 3,
          "Name": "Fitness",
      },{
          "Id": 4,
          "CategoryId": 4,
          "Name": "Motorcyles",
      },{
          "Id": 5,
          "CategoryId": 4,
          "Name": "Cars",
      },{
          "Id": 6,
          "CategoryId": 4,
          "Name": "Boats",
      },{
          "Id": 8,
          "CategoryId": 8,
          "Name": "C#",
      },{
          "Id": 9,
          "CategoryId": 8,
          "Name": "HTML/CSS",
      },{
          "Id": 10,
          "CategoryId": 8,
          "Name": "Java",
      }],
      experts: [{
        "Id": '1026',
        "Rating": 2,
        "Price": "6.50",
        "Timezone": "America/Chicago"
      },{
        "Id": '2015',
        "Rating": 5,
        "Price": "11.20",
        "Timezone": "America/Los_Angeles"
      },{
        "Id": '1422',
        "Rating": 2,
        "Price": "6.50",
        "Timezone": "America/New_York"
      }],
      topicExperts: [{
        "topicId": 10,
        "expertId": '2015'
      },{
        "topicId": 10,
        "expertId": '1422'
      }],
      orders: [{
        "id": 15352,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "6.50",
        "status": "Unanswered",
        "submitted": new Date,
        "callLength": 0
      },{
        "id": 45812,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "14.00",
        "status": "Completed",
        "submitted": new Date,
        "callLength": 650
      },{
        "id": 15852,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "6.50",
        "status": "Unanswered",
        "submitted": new Date,
        "callLength": 0
      },{
        "id": 45992,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "14.00",
        "status": "Completed",
        "submitted": new Date,
        "callLength": 650
      },{
        "id": 15472,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "6.50",
        "status": "Unanswered",
        "submitted": new Date,
        "callLength": 650
      },{
        "id": 46542,
        "topicId": 10,
        "expertId": '00udcgckbJqbH3qRz4x6',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "14.00",
        "status": "Completed",
        "submitted": new Date,
        "callLength": 650
      },{
        "id": 15452,
        "topicId": 10,
        "expertId": '00udcgckbJqbH3qRz4x6',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "6.50",
        "status": "Unanswered",
        "submitted": new Date,
        "callLength": 0
      },{
        "id": 63548,
        "topicId": 10,
        "expertId": '00udanvuiR0zHzzzi4x6',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "14.00",
        "status": "Completed",
        "submitted": new Date,
        "callLength": 650
      },{
        "id": 62538,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "6.50",
        "status": "Unanswered",
        "submitted": new Date,
        "callLength": 0
      },{
        "id": 40612,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "14.00",
        "status": "Completed",
        "submitted": new Date,
        "callLength": 0
      },{
        "id": 15312,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "6.50",
        "status": "Unanswered",
        "submitted": new Date,
        "callLength": 0
      },{
        "id": 45712,
        "topicId": 10,
        "expertId": '2015',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "14.00",
        "status": "Completed",
        "submitted": new Date,
        "callLength": 0
      },{
        "id": 15652,
        "topicId": 10,
        "expertId": '00udanvuiR0zHzzzi4x6',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "6.50",
        "status": "Unanswered",
        "submitted": new Date,
        "callLength": 0
      },{
        "id": 64674,
        "topicId": 10,
        "expertId": '00udanvuiR0zHzzzi4x6',
        "userId": "00udanvuiR0zHzzzi4x6",
        "charge": "14.00",
        "status": "Completed",
        "submitted": new Date,
        "callLength": 650
      }],
      orderPasskeys: [{
        "orderId": 15352,
        "clientPasskey": "pineapple"
      },{
        "orderId": 45812,
        "clientPasskey": "bologna"
      },{
        "orderId": 15852,
        "clientPasskey": "salami"
      },{
        "orderId": 45992,
        "clientPasskey": "hippopotamus"
      },{
        "orderId": 15472,
        "clientPasskey": "irreverent"
      },{
        "orderId": 46542,
        "clientPasskey": "matramony"
      },{
        "orderId": 15452,
        "clientPasskey": "cylindrical"
      },{
        "orderId": 63548,
        "clientPasskey": "patriarchy"
      },{
        "orderId": 62538,
        "clientPasskey": "interesting"
      },{
        "orderId": 40612,
        "clientPasskey": "inescapable"
      },{
        "orderId": 15312,
        "clientPasskey": "portrait"
      },{
        "orderId": 45712,
        "clientPasskey": "defined"
      },{
        "orderId": 15652,
        "clientPasskey": "inexcusable"
      },{
        "orderId": 64674,
        "clientPasskey": "indescribable"
      }]
  },
  getters: {
    getTimezones: state => {
      return state.tz_timezones
    },
    allCategories: state => {
      return state.categories
    },
    allTopics: state => {
      return state.topics
    },
    topics: (state) => (_categoryId) => {
      return state.topics.filter(topic => topic.CategoryId == _categoryId)
    },
    topic: (state) => (id) => {
        return state.topics.find(topic => topic.Id == id)
    },
    getTopicsWithSubstring: (state) => (substring) => {
      return state.topics.filter(topic => topic.Name.toLowerCase().includes(substring.toLowerCase()))
    },
    allExperts: state => {
      return state.experts
    },
    expertById: (state) => (id) => {
      return state.experts.find(expert => expert.Id == id)
    },
    expertsByTopicId: (state) => (topicId) => {
      const topicExperts = state.topicExperts.filter(topicExpert => topicExpert.topicId == topicId);
      let experts = [];
      topicExperts.forEach(element => {
        experts.push(state.experts.find(expert => expert.Id == element.expertId));
      });
      return experts;
    },
    getExpertTopics: (state) => (userId) => {
      return state.topicExperts.filter(topicExpert => topicExpert.expertId == userId);
    },
    getExpertTimezone: (state) => (userId) => {
      return state.experts.find(expert => expert.Id == userId).Timezone;
    },
    getUserOrdersTotal: (state) => (userId) => {
      return state.orders.filter(order => order.userId == userId).length;
    },
    getUserOrders: (state) => (userId, startIndex, count) => {
      return state.orders.filter(order => order.userId == userId).sort((a, b) => b.date - a.date).slice(startIndex, startIndex + count);
    },
    getExpertsOrders: (state) => (expertId) => {
      return state.orders.filter(order => order.expertId === expertId).sort((a, b) => b.date - a.date);
    },
    getClientPasskey: (state) => (_orderId) => {
      return state.orderPasskeys.find(order => order.orderId == _orderId).clientPasskey;
    }
  },
  modules: {
  }
})

<template>
  <div>
    <ul>
      <li v-for="(item, index) in userList" :key="index">
        <a :href="'/hello/' + item">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userList: ["Dave", "Lisa", "Jeremy", "Jim"]
    };
  }
};
</script>

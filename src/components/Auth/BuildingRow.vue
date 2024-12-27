<template>
  <tr>
      <td>{{ sort }}</td>
      <td>{{ name }}</td>
      <td>
          <i class="bi bi-pencil-square"></i> |
          <i class="bi bi-trash-fill"></i>
      </td>
  </tr>
</template>

<script>
  export default {
    props: ["id","sort","name"],
  };
</script>
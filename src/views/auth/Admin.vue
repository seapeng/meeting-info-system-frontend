<template>
    <div id="wrapper">
        <!-- Sidebar -->
        <Sidebar></Sidebar>

        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <!-- Topbar -->
                <Topbar></Topbar>

                <div class="container-fluid">
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <div class="float-left">
                                <h6 class="m-0 font-weight-bold text-primary">ថ្នាក់ដឹកនាំ</h6>
                            </div>

                            <div class="float-right margin-top-2">
                                <a href="" data-toggle="modal" data-target="#CreateModal">
                                    <i class="fas fa-fw fa-plus-circle"></i> បង្កើតថ្មី
                                </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>ល.រ</th>
                                            <th>គោត្តនាម និងនាម</th>
                                            <th>គណនីប្រើប្រាស់</th>
                                            <th>ផ្សេងៗ</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>សៀ ប៉េង</td>
                                            <td>seapeng</td>
                                            <td>
                                                <i class="bi bi-pencil-square"></i> |
                                                <i class="bi bi-trash-fill"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>ដាវ វិទូ</td>
                                            <td>vitou</td>
                                            <td>
                                                <i class="bi bi-pencil-square"></i> |
                                                <i class="bi bi-trash-fill"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <Footer></Footer>

        </div>
    </div>

    <!-- Create Modal-->
    <div class="modal fade" id="CreateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <form method="post" action="">
                        <div class="form-group">
                            <label for="sort">គោត្តនាម និងនាម :</label>
                            <input class="form-control" name="fullname" type="text" required>
                        </div>
                        <div class="form-group">
                            <label for="name">គណនីប្រើប្រាស់ :</label>
                            <input class="form-control" name="username" type="text" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ពាក្យសម្ងាត់ :</label>
                            <input class="form-control" name="password" type="password" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ផ្ទៀងផ្តាត់ពាក្យសម្ងាត់ :</label>
                            <input class="form-control" name="confirm-password" type="password" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">បដិសេធ</button>
                            <button type="submit" name="save" class="btn btn-primary">រក្សាទុក</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
    import Footer from '@/components/Auth/Footer.vue';
    import Sidebar from '@/components/Auth/Sidebar.vue';
    import Topbar from '@/components/Auth/Topbar.vue';

    export default {
        components: {
            Sidebar,
            Topbar,
            Footer
        },
    };
</script>
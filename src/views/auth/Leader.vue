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
                                            <th>គោត្តនាម និងនាមថ្នាក់ដឹកនាំ</th>
                                            <th>តួនាទី</th>
                                            <th>ផ្សេងៗ</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>ឯកឧត្តម ឌិត ទីណា</td>
                                            <td>រដ្ឋមន្ត្រីក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ</td>
                                            <td>
                                                <i class="bi bi-pencil-square"></i> |
                                                <i class="bi bi-trash-fill"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>ឯកឧត្តម អ៉ឹម ស៊ីថុល</td>
                                            <td>រដ្ឋលេខាធិការប្រចាំការ</td>
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
                            <label for="sort">លេខលំដាប់ :</label>
                            <input class="form-control" name="sort" type="number" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ឈ្មោះបន្ទប់ :</label>
                            <input class="form-control" name="name" type="text" required>
                        </div>
                        <div class="form-group">
                            <label for="name">អាគារ :</label>
                            <input class="form-control" name="building" type="text" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ជាន់ :</label>
                            <input class="form-control" name="floor" type="text" required>
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
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
                                <h6 class="m-0 font-weight-bold text-primary">កិច្ចប្រជុំ</h6>
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
                                            <th>កាលបរិច្ឆេទ</th>
                                            <th>ខ្លឺមសារ</th>
                                            <th>ទីកន្លែង</th>
                                            <th>ផ្សេងៗ</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        <tr>
                                            <td>
                                                2024-12-26 <br />
                                                15:00
                                            </td>
                                            <td>ចូលរួមប្រជុំពិភាក្សាបន្តលើសេចក្តីព្រាងច្បាប់ស្តីពី កិច្ចសន្យាផលិតកម្មកសិកម្ម <br/>
                                                ដឹកនាំដោយ ឯកឧត្តម <b>វ៉ា ពិសី</b> អនុរដ្ឋលេខាធិការ
                                            </td>
                                            <td>
                                                អគារ :តេជោសន្តិភាព <br/>
                                                ជាន់ :ទី១ <br/>
                                                បន្ទប់ :បូព្រឹក
                                            </td>
                                            <td>
                                                <i class="bi bi-pencil-square"></i> |
                                                <i class="bi bi-trash-fill"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2024-12-26 <br />
                                                15:00
                                            </td>
                                            <td>ចូលរួមប្រជុំពិភាក្សាបន្តលើសេចក្តីព្រាងច្បាប់ស្តីពី កិច្ចសន្យាផលិតកម្មកសិកម្ម <br/>
                                                ដឹកនាំដោយ ឯកឧត្តម <b>វ៉ា ពិសី</b> អនុរដ្ឋលេខាធិការ
                                            </td>
                                            <td>
                                                អគារ :តេជោសន្តិភាព <br/>
                                                ជាន់ :ទី១ <br/>
                                                បន្ទប់ :បូព្រឹក
                                            </td>
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
                            <label for="sort">កាលបរិច្ឆេទ :</label>
                            <input class="form-control" type="date" name="date" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ខ្លឺមសារ :</label>
                            <input class="form-control" name="name" type="text" required>
                        </div>
                        <div class="form-group">
                            <label for="name">ដឹកនាំដោយ :</label>
                            <input class="form-control" name="building" type="text" required>
                        </div>
                        <div class="form-group">
                            <label for="start_time">ម៉ោងប្រជុំ :</label>
                            <input class="time-control" type="time" name="start_time" required> 

                            <label for="end_time">ដល់ </label>
                            <input class="time-control" type="time" name="end_time" required>
                        </div>
                        <div class="form-group">
                            <label for="name">បន្ទប់ប្រជុំ :</label>
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
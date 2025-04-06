package com.Capstone.ArchiquestBackend.Controller;
import com.Capstone.ArchiquestBackend.DTO.LoginDTO;
import com.Capstone.ArchiquestBackend.DTO.StudentDTO;
import com.Capstone.ArchiquestBackend.Service.StudentService;
import com.Capstone.ArchiquestBackend.payloadresponse.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/test")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping(path = "/print")
    public String print() {
        return "Print test";
    }

    @PostMapping(path = "/save")
    public String saveStudent (@RequestBody StudentDTO studentDTO) {
        System.out.println("Received student: " + studentDTO);
        String id = studentService.addStudent(studentDTO);
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginStudent (@RequestBody LoginDTO loginDTO){
        LoginResponse loginResponse = studentService.loginStudent(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}

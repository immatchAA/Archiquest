package com.Capstone.ArchiquestBackend.Service;


import com.Capstone.ArchiquestBackend.DTO.LoginDTO;
import com.Capstone.ArchiquestBackend.DTO.StudentDTO;
import com.Capstone.ArchiquestBackend.payloadresponse.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public interface StudentService {
    String addStudent(StudentDTO studentDTO);
    LoginResponse loginStudent(LoginDTO loginDTO);
}

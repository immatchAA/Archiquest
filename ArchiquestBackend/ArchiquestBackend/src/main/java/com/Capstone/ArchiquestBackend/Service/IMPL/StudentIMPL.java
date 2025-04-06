package com.Capstone.ArchiquestBackend.Service.IMPL;


import com.Capstone.ArchiquestBackend.DTO.LoginDTO;
import com.Capstone.ArchiquestBackend.DTO.StudentDTO;
import com.Capstone.ArchiquestBackend.Entity.StudentEntity;
import com.Capstone.ArchiquestBackend.Repository.StudentRepo;
import com.Capstone.ArchiquestBackend.Service.StudentService;
import com.Capstone.ArchiquestBackend.payloadresponse.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class StudentIMPL implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addStudent(StudentDTO studentDTO) {
        System.out.println("PasswordEncoder is null? " + (passwordEncoder == null));
        StudentEntity studentEntity = new StudentEntity(
                studentDTO.getStudentID(),
                studentDTO.getFirstName(),
                studentDTO.getLastName(),
                studentDTO.getEmail(),
                this.passwordEncoder.encode(studentDTO.getPassword())
        );

        studentRepo.save(studentEntity);
        return studentEntity.getFirstName();
    }

    @Override
    public LoginResponse loginStudent(LoginDTO loginDTO) {
        String msg = "";
        StudentEntity studentEntity1 = studentRepo.findByEmail(loginDTO.getEmail());

        if (studentEntity1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = studentEntity1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                Optional<StudentEntity> studentEntity = studentRepo.findOneByEmailAndPassword(
                        loginDTO.getEmail(), encodedPassword);

                if (studentEntity.isPresent()) {
                    return new LoginResponse("Login successful", true);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {
                return new LoginResponse("Password does not Match", false);
            }

        } else {
            return new LoginResponse("Email does not exist", false);
        }
    }


}

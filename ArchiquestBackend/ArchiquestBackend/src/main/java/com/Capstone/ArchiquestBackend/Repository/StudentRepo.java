package com.Capstone.ArchiquestBackend.Repository;


import com.Capstone.ArchiquestBackend.Entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface StudentRepo extends JpaRepository <StudentEntity, Integer> {
    Optional<StudentEntity> findOneByEmailAndPassword (String email, String password);
    StudentEntity findByEmail (String email);
}

package com.bcs.sip.application.repository;

import com.bcs.sip.application.domain.SKU;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SKU entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SKURepository extends JpaRepository<SKU, Long> {

}

package com.bcs.sip.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bcs.sip.application.service.SalesOrderService;
import com.bcs.sip.application.web.rest.errors.BadRequestAlertException;
import com.bcs.sip.application.web.rest.util.HeaderUtil;
import com.bcs.sip.application.web.rest.util.PaginationUtil;
import com.bcs.sip.application.service.dto.SalesOrderDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SalesOrder.
 */
@RestController
@RequestMapping("/api")
public class SalesOrderResource {

    private final Logger log = LoggerFactory.getLogger(SalesOrderResource.class);

    private static final String ENTITY_NAME = "salesOrder";

    private final SalesOrderService salesOrderService;

    public SalesOrderResource(SalesOrderService salesOrderService) {
        this.salesOrderService = salesOrderService;
    }

    /**
     * POST  /sales-orders : Create a new salesOrder.
     *
     * @param salesOrderDTO the salesOrderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new salesOrderDTO, or with status 400 (Bad Request) if the salesOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sales-orders")
    @Timed
    public ResponseEntity<SalesOrderDTO> createSalesOrder(@Valid @RequestBody SalesOrderDTO salesOrderDTO) throws URISyntaxException {
        log.debug("REST request to save SalesOrder : {}", salesOrderDTO);
        if (salesOrderDTO.getId() != null) {
            throw new BadRequestAlertException("A new salesOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalesOrderDTO result = salesOrderService.save(salesOrderDTO);
        return ResponseEntity.created(new URI("/api/sales-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sales-orders : Updates an existing salesOrder.
     *
     * @param salesOrderDTO the salesOrderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated salesOrderDTO,
     * or with status 400 (Bad Request) if the salesOrderDTO is not valid,
     * or with status 500 (Internal Server Error) if the salesOrderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sales-orders")
    @Timed
    public ResponseEntity<SalesOrderDTO> updateSalesOrder(@Valid @RequestBody SalesOrderDTO salesOrderDTO) throws URISyntaxException {
        log.debug("REST request to update SalesOrder : {}", salesOrderDTO);
        if (salesOrderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SalesOrderDTO result = salesOrderService.save(salesOrderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, salesOrderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sales-orders : get all the salesOrders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of salesOrders in body
     */
    @GetMapping("/sales-orders")
    @Timed
    public ResponseEntity<List<SalesOrderDTO>> getAllSalesOrders(Pageable pageable) {
        log.debug("REST request to get a page of SalesOrders");
        Page<SalesOrderDTO> page = salesOrderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sales-orders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sales-orders/:id : get the "id" salesOrder.
     *
     * @param id the id of the salesOrderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the salesOrderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sales-orders/{id}")
    @Timed
    public ResponseEntity<SalesOrderDTO> getSalesOrder(@PathVariable Long id) {
        log.debug("REST request to get SalesOrder : {}", id);
        Optional<SalesOrderDTO> salesOrderDTO = salesOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(salesOrderDTO);
    }

    /**
     * DELETE  /sales-orders/:id : delete the "id" salesOrder.
     *
     * @param id the id of the salesOrderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sales-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteSalesOrder(@PathVariable Long id) {
        log.debug("REST request to delete SalesOrder : {}", id);
        salesOrderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

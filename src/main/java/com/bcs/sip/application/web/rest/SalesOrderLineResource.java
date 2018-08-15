package com.bcs.sip.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bcs.sip.application.service.SalesOrderLineService;
import com.bcs.sip.application.web.rest.errors.BadRequestAlertException;
import com.bcs.sip.application.web.rest.util.HeaderUtil;
import com.bcs.sip.application.web.rest.util.PaginationUtil;
import com.bcs.sip.application.service.dto.SalesOrderLineDTO;
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
 * REST controller for managing SalesOrderLine.
 */
@RestController
@RequestMapping("/api")
public class SalesOrderLineResource {

    private final Logger log = LoggerFactory.getLogger(SalesOrderLineResource.class);

    private static final String ENTITY_NAME = "salesOrderLine";

    private final SalesOrderLineService salesOrderLineService;

    public SalesOrderLineResource(SalesOrderLineService salesOrderLineService) {
        this.salesOrderLineService = salesOrderLineService;
    }

    /**
     * POST  /sales-order-lines : Create a new salesOrderLine.
     *
     * @param salesOrderLineDTO the salesOrderLineDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new salesOrderLineDTO, or with status 400 (Bad Request) if the salesOrderLine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sales-order-lines")
    @Timed
    public ResponseEntity<SalesOrderLineDTO> createSalesOrderLine(@Valid @RequestBody SalesOrderLineDTO salesOrderLineDTO) throws URISyntaxException {
        log.debug("REST request to save SalesOrderLine : {}", salesOrderLineDTO);
        if (salesOrderLineDTO.getId() != null) {
            throw new BadRequestAlertException("A new salesOrderLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalesOrderLineDTO result = salesOrderLineService.save(salesOrderLineDTO);
        return ResponseEntity.created(new URI("/api/sales-order-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sales-order-lines : Updates an existing salesOrderLine.
     *
     * @param salesOrderLineDTO the salesOrderLineDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated salesOrderLineDTO,
     * or with status 400 (Bad Request) if the salesOrderLineDTO is not valid,
     * or with status 500 (Internal Server Error) if the salesOrderLineDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sales-order-lines")
    @Timed
    public ResponseEntity<SalesOrderLineDTO> updateSalesOrderLine(@Valid @RequestBody SalesOrderLineDTO salesOrderLineDTO) throws URISyntaxException {
        log.debug("REST request to update SalesOrderLine : {}", salesOrderLineDTO);
        if (salesOrderLineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SalesOrderLineDTO result = salesOrderLineService.save(salesOrderLineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, salesOrderLineDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sales-order-lines : get all the salesOrderLines.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of salesOrderLines in body
     */
    @GetMapping("/sales-order-lines")
    @Timed
    public ResponseEntity<List<SalesOrderLineDTO>> getAllSalesOrderLines(Pageable pageable) {
        log.debug("REST request to get a page of SalesOrderLines");
        Page<SalesOrderLineDTO> page = salesOrderLineService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sales-order-lines");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sales-order-lines/:id : get the "id" salesOrderLine.
     *
     * @param id the id of the salesOrderLineDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the salesOrderLineDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sales-order-lines/{id}")
    @Timed
    public ResponseEntity<SalesOrderLineDTO> getSalesOrderLine(@PathVariable Long id) {
        log.debug("REST request to get SalesOrderLine : {}", id);
        Optional<SalesOrderLineDTO> salesOrderLineDTO = salesOrderLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(salesOrderLineDTO);
    }

    /**
     * DELETE  /sales-order-lines/:id : delete the "id" salesOrderLine.
     *
     * @param id the id of the salesOrderLineDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sales-order-lines/{id}")
    @Timed
    public ResponseEntity<Void> deleteSalesOrderLine(@PathVariable Long id) {
        log.debug("REST request to delete SalesOrderLine : {}", id);
        salesOrderLineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
